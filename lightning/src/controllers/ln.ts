import LNPayService from "../services/Pay";

exports.createWallet = async (req: any, res: any) => {
  const wallet = await LNPayService.createWallet(req.body.username);
  res.status(200).json({ success: true, wallet });
};

exports.getWallet = async (req: any, res: any) => {
  const wallet = await LNPayService.getWallet();
  res.status(200).json({ success: true, wallet });
};
