import { Response, Request } from "express";
import LNPayService from "../services/Pay";

export const getWallet = async (req: Request, res: Response) => {
  const wallet = await LNPayService.getWallet();
  res.status(200).json({ success: true, wallet });
};

export const getTxs = async (req: Request, res: Response) => {
  const txs = await LNPayService.getTxs();
  res.status(200).json({ success: true, txs });
};

export const createLnAddress = async (req: Request, res: Response) => {
  const data = await LNPayService.createLnAddress("testuser123abc");
  res.status(200).json({ success: true, ...data });
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

export const lightningAddress = (req: Request, res: Response) => {
  if (!req.params.username) {
    res.status(404).json({ success: true, message: "Please provide username" });
  }

  res.redirect(
    `https://lnaddr.lnpay.co/.well-known/lnurlp/${req.params.username}`
  );
};
