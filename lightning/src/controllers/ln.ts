import LNPayService from "../services/Pay";

export const SocketEvents = {
  invoiceUpdated: "invoice-updated",
  invoicePaid: "invoice-paid",
  bountyCreated: "bounty-created",
};

exports.createWallet = async (req: any, res: any) => {
  const wallet = await LNPayService.createWallet(req.body.username);
  res.status(200).json({ success: true, wallet });
};

exports.generateInvoice = async (req: any, res: any) => {
  const invoice = await LNPayService.generateInvoice();
  res.status(200).json({ success: true, invoice });
};

exports.getWallet = async (req: any, res: any) => {
  const wallet = await LNPayService.getWallet();
  res.status(200).json({ success: true, wallet });
};
