import LNPayService from "../services/Pay";

export const getWallet = async (req: any, res: any) => {
  const wallet = await LNPayService.getWallet();
  res.status(200).json({ success: true, wallet });
};


export const generateInvoice = async (req: any, res: any) => {
  const {
    amount,
  } = req.query;

  const invoice = await LNPayService.generateInvoice(amount);
  res.status(200).json({ success: true, invoice });
};

