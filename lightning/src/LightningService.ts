import { EventEmitter } from "events";
// import { LndNode } from "./Supabase";
import * as lightning from "LightningService";
import { AuthenticatedLnd, payViaPaymentRequest } from "lightning";

export const NodeEvents = {
  invoiceUpdated: "invoice-updated",
  invoicePaid: "invoice-paid",
  bountyCreated: "bounty-created",
};

class Lightning extends EventEmitter {
  private lnd: AuthenticatedLnd | null = null;
  private lnurlSecretMap: Record<string, string> = {};
  private lnurlK1Map: Record<string, string> = {};
  public pubkey: string | null = null;

  getLnd(): AuthenticatedLnd {
    if (!this.lnd) {
      throw new Error("Not Authorized. You must login first!");
    }

    return this.lnd;
  }

  setLnurlSecret(hash: string, user: string) {
    this.lnurlSecretMap[hash] = user;
  }

  setLnurlk1(k1: string, user: string) {
    this.lnurlK1Map[k1] = user;
  }

  getLnurlSecret(hash: string) {
    const secret = this.lnurlSecretMap[hash];
    delete this.lnurlSecretMap[hash];
    if (secret) return secret;
    return null;
  }

  getlnUrlk1(k1: string) {
    const k1Record = this.lnurlK1Map[k1];
    delete this.lnurlK1Map[k1];
    if (k1Record) return k1Record;
    return null;
  }

  deletek1Record(k1: string) {
    delete this.lnurlK1Map[k1];
  }
  deleteSecretRecord(secret: string) {
    delete this.lnurlSecretMap[secret];
  }

  async connect() {
    try {
      const { lnd } = await lightning.authenticatedLndGrpc({
        macaroon: process.env.MACAROON,
        socket: process.env.HOST,
      });

      const msg = Buffer.from("authorization test").toString("base64");

      await lightning.signMessage({
        lnd,
        message: msg,
      });

      const { public_key } = await lightning.getIdentity({ lnd });
      this.syncInvoices(lnd);
      console.log("connected lnd");

      this.lnd = lnd;
      this.pubkey = public_key;
    } catch (err) {
      console.log({ err });
    }

    return;
  }

  /**
   * Reconnect to all persisted nodes to to cache the `LnRpc` objects
   * @param nodes the list of nodes
   */
  async reconnectNode(node: any) {
    const nodePub = process.env.NODE_PUBKEY;
    const host = process.env.HOST;

    if (!nodePub || !host) {
      console.error(`Failed to reconnect to LND node, couldn't find your node`);
      return;
    }

    try {
      console.log(`Reconnecting to LND node ${host}`);
      await this.connect();
    } catch (error) {
      // the token will not be cached
      console.error(`Failed to reconnect to LND node ${host}`);
    }
  }

  async cancelHodl(id: string) {
    if (!this.lnd) return null;
    console.log({ id });
    const response = await lightning.cancelHodlInvoice({
      id,
      lnd: this.lnd,
    });
    return response;
  }

  async payInvoice(request: string) {
    if (this.lnd) {
      const response = await payViaPaymentRequest({ lnd: this.lnd, request });
      return response;
    }
  }

  async subscribeToInvoice(
    lnd: AuthenticatedLnd,
    id: string,
    bountyId: string
  ) {
    const stream = lightning.subscribeToInvoice({ lnd, id });
    stream.on("invoice_updated", async (invoice) => {
      console.log({
        invoice_updated: {
          id: invoice.id,
          held: invoice.is_held,
          canceled: invoice.is_canceled,
          confirmed: invoice.is_confirmed,
        },
      });
      const { confirmed_at, id } = invoice;
      if (invoice.is_held) {
        // await db.updateInvoice(id, "HELD");
        // await db.calculateBountyBalance(invoice.id);
        this.emit(NodeEvents.invoicePaid, { hash: invoice.id, bountyId });
      }
      // if (invoice.is_confirmed) await db.settlePayment(confirmed_at, id);
      // if (invoice.is_canceled) await db.updateInvoice(id, "CANCELED");
    });
  }
}

export default new Lightning();
