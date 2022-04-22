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

  generateInvoice = async (amount: number) => {
    try {
      const client = LNPay({
        secretKey: process.env.LNPAY_SECRET ?? "",
        walletAccessKey: process.env.MASTER_KEY ?? "",
      });

      const invoice = await client.generateInvoice({
        num_satoshis: amount,
        memo: "This is a memo",
        expiry: 86400,
      });

      return invoice;
    } catch (error: any) {
      console.error(error);
    }
  };

  payInvoice = async (paymentRequest: string) => {
    const lnpay = LNPay({
      secretKey: process.env.LNPAY_SECRET ?? "",
      walletAccessKey: process.env.MASTER_KEY ?? "",
    });


    try {
      const payInvoice = await lnpay.payInvoice({
        payment_request: paymentRequest,
      });

      return payInvoice

    } catch (err) {
      console.log({ err })
    }



  }





}

export default new LNPayService();
