import { Response, Request } from "express";
import LNPayService from "../services/Pay";

export const getWallet = async (req: Request, res: Response) => {
  const wallet = await LNPayService.getWallet();
  res.status(200).json({ success: true, wallet });
};


export const generateInvoice = async (req: Request, res: Response) => {
  const {
    amount,
  } = req.query;
  if (!amount) return
  const invoice = await LNPayService.generateInvoice(parseInt(amount as string));
  res.status(200).json({ success: true, invoice });
};

export const payInvoice = async (req: Request, res: Response) => {
  const {
    payRequest,
  } = req.body


  if (!payRequest) return

  const result = await LNPayService.payInvoice(payRequest);

  res.status(200).json({ success: true, result });
}

