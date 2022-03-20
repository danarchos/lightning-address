import { EventEmitter } from "events";
import LNPay from "lnpay";
require("dotenv").config();

export const LNPayEvents = {
  invoicePaid: "invoice-paid",
};

interface TipPassThruProps {
  destinationWalletId: string;
  tipperUserId: string;
  recieverUserId: string;
  videoId: string;
  videoTime: string;
}

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

      // TEMPORARY - PREXISTING WALLET - MAKING TOO MANY WALLETS
      const wallet = {
        id: "wal_RCA20Sb9LkNIgM",
        masterKey: "waka_T6xytEWyvIhImThC4dZj4GXl",
        recieveKey: "waki_NX5nZ3QjfAh67qoOztOz5i",
        readKey: "wakr_73y7IR2TuS7Z8cNFQWTKUrNq",
        lnUrlWithdrawKey: "waklw_xA8BOJ3mhVc0i0dITc5aDgoZ",
        lnUrlPayKey: "waklp_lT4w80fidOhzSKcv3dNQn8h",
      };

      return wallet;
    } catch (error: any) {
      console.error(error);
    }
  };

  generateTipInvoice = async (amount: number, passThru: TipPassThruProps) => {
    try {
      const client = LNPay({
        secretKey: process.env.LNPAY_SECRET ?? "",
        walletAccessKey: process.env.MASTER_KEY ?? "",
      });

      const invoice = await client.generateInvoice({
        num_satoshis: amount,
        memo: "This is a memo",
        expiry: 86400,
        passThru: { ...passThru },
      });

      return invoice;
    } catch (error: any) {
      console.error(error);
    }
  };

  forwardPayment = async (amount: number, destinationWalletId: string) => {
    try {
      const client = LNPay({
        secretKey: process.env.LNPAY_SECRET ?? "",
        walletAccessKey: process.env.MASTER_KEY ?? "",
      });
      const transfer = client.transfer({
        dest_wallet_id: destinationWalletId,
        memo: "Transfer Memo",
        num_satoshis: amount,
        lnPayParams: {
          order_id: "100",
        },
      });
      console.log("Transfered", transfer);
    } catch (error: any) {
      console.error(error);
    }
  };

  getWallet = async () => {
    const tempKey = "waka_OWuCnc5qfAPc9uJ1W215qTL";
    try {
      const client = LNPay({
        secretKey: process.env.LNPAY_SECRET ?? "",
        walletAccessKey: tempKey,
      });
      const balance = await client.getBalance();
      return balance;
    } catch (error: any) {
      console.error(error);
    }
  };
}

export default new LNPayService();
