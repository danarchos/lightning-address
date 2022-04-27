import e, { Response, Request } from "express";
import LNPayService from "../services/Pay";
import { createHash, randomBytes } from "crypto";

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
  const invoice = await LNPayService.generateInvoice(
    parseInt(amount as string)
  );
  res.status(200).json({ success: true, invoice });
};

export const payInvoice = async (req: Request, res: Response) => {
  const { payRequest } = req.body;

  if (!payRequest) return;

  const result = await LNPayService.payInvoice(payRequest);

  res.status(200).json({ success: true, result });
};

export const initiateLnurlPayAddress = (req: Request, res: Response) => {
  if (!req.params.username) {
    res.status(404).json({ success: true, message: "Please provide username" });
  }

  const response = {
    minSendable: 1000,
    maxSendable: 10000000,
    tag: "payRequest",
    metadata: '[["text/plain","Test"]]',
    callback: "https://juna.to/lightning/execute-lnurl-pay-address",
  };

  res.status(200).json({ ...response });
};

export const executeLnurlPayAddress = async (req: Request, res: Response) => {
  const { amount } = req.query;

  const descriptionHash = createHash("sha256")
    .update('[["text/plain","Test"]]')
    .digest("hex");

  const inSatoshis = parseInt(amount as string) / 1000;

  if (inSatoshis < 1) {
    res.status(402).json({ message: "Needs to be more than 1 sat" });
    return;
  }

  const invoice = await LNPayService.generateInvoice(
    inSatoshis,
    descriptionHash
  );

  res.status(200).json({ pr: invoice.payment_request, routes: [] });
};
