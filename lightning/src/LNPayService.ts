import { EventEmitter } from "events";
import LNPay from "lnpay";
require("dotenv").config();

export const LNPayEvents = {
  invoicePaid: "invoice-paid",
};

class LNPayService extends EventEmitter {
  createWallet = async (username: string) => {
    try {
      const client = LNPay({
        secretKey: "sak_g0jIDuMNqq9XsOufjY8D3IyV4ERssDwS",
      });

      // const wallet = await client.createWallet({
      //   user_label: username,
      // });
      // const newWallet = wallet.access_keys["Wallet Admin"][0];

      // TESTING AUTH
      const newWallet = "waka_T6xytEWyvIhImThC4dZj4GXl";

      return newWallet;
    } catch (error: any) {
      console.error(error);
    }
  };

  generateInvoice = async () => {
    const tempKey = "waka_OWuCnc5qfAPc9uJ1W215qTL";
    try {
      const client = LNPay({
        secretKey: "sak_g0jIDuMNqq9XsOufjY8D3IyV4ERssDwS",
        walletAccessKey: tempKey,
      });

      const invoice = await client.generateInvoice({
        num_satoshis: 100,
        passThru: {
          // This id needs to be uniquely set by the client or in app.ws(/events)
          // in order to get back from payment recieved event to know which websocket connection to notify
          sessionId: "dasbnnqwd23din",
        },
        memo: "This is a memo",
        expiry: 86400,
      });

      return invoice;
    } catch (error: any) {
      console.error(error);
    }
  };

  getWallet = async () => {
    const tempKey = "waka_OWuCnc5qfAPc9uJ1W215qTL";
    try {
      const client = LNPay({
        secretKey: "sak_g0jIDuMNqq9XsOufjY8D3IyV4ERssDwS",
        walletAccessKey: tempKey,
      });
      const balance = await client.getBalance();
      return balance;
    } catch (error: any) {
      console.error(error);
    }
  };

  // Needs to change name, but is the method that is passed to the webhook
  trigger = async () => {
    let videoId = "1234";
    this.emit(LNPayEvents.invoicePaid, {
      videoId,
    });
  };
}

export default new LNPayService();
