import { Response, Request } from "express";
import LNPayService from "../services/Pay";
import { createHash } from "crypto";
import { User } from "../models/User";

export const getWallet = async (req: Request, res: Response) => {
  const wallet = await LNPayService.getWallet();
  res.status(200).json({ success: true, wallet });
};

export const getTxs = async (req: Request, res: Response) => {
  const txs = await LNPayService.getTxs();
  res.status(200).json({ success: true, txs });
};

export const generateInvoice = async (req: Request, res: Response) => {
  const { amount } = req.query;
  if (!amount) return;
  // const invoice = await LNPayService.generateInvoice(
  //   parseInt(amount as string)
  // );
  res.status(200).json({ success: false, message: "Needs dev work" });
};

export const payInvoice = async (req: Request, res: Response) => {
  const { payRequest } = req.body;

  if (!payRequest) return;

  const result = await LNPayService.payInvoice(payRequest);

  res.status(200).json({ success: true, result });
};

export const initiateLnurlPayAddress = async (req: Request, res: Response) => {
  if (!req.params.username) {
    res
      .status(404)
      .json({ success: false, message: "Please provide username" });
  }

  // Get the userId by username
  const userData = await User.findOne({ username: req.params.username });

  if (!userData) {
    res
      .status(404)
      .json({ success: false, message: "No username that matches" });
    return;
  }

  const response = {
    minSendable: 1000,
    maxSendable: 10000000,
    tag: "payRequest",
    metadata: `[["text/plain","${userData.wallet.recieveKey}"]]`,
    callback: `https://juna.to/lightning/lnurlp/${userData.wallet.recieveKey}`,
  };

  res.status(200).json({ ...response });
};

export const executeLnurlPayAddress = async (req: Request, res: Response) => {
  const { amount } = req.query;

  if (!amount) {
    res.status(400).json({
      success: false,
      message: "Minimum amount is 1 Satoshi. Pay up, my dude.",
    });
    return;
  }
  const inSatoshis = parseInt(amount as string) / 1000;

  if (inSatoshis < 1) {
    res.status(400).json({
      success: false,
      message: "Minimum amount is 1 Satoshi. Pay up, my dude.",
    });
    return;
  }

  const descriptionHash = createHash("sha256")
    .update(`[["text/plain","${req.params.walletId}"]]`)
    .digest("hex");

  const invoice = await LNPayService.generateInvoice({
    walletId: req.params.walletId,
    sats: inSatoshis,
    descriptionHash,
  });

  res.status(200).json({ pr: invoice.payment_request, routes: [] });
};
