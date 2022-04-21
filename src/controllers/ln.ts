import LNPayService from "../services/Pay";

export const createWallet = async (req: any, res: any) => {
  const wallet = await LNPayService.createWallet(req.body.username);
  res.status(200).json({ success: true, wallet });
};

export const getWallet = async (req: any, res: any) => {
  const wallet = await LNPayService.getWallet();
  res.status(200).json({ success: true, wallet });
};
