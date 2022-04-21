import LNPayService from "../services/Pay";

export const getWallet = async (req: any, res: any) => {
  const wallet = await LNPayService.getWallet();
  res.status(200).json({ success: true, wallet });
};
