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

exports.generateTipInvoice = async (req: any, res: any) => {
  const {
    destinationWalletId,
    amount,
    tipperUserId,
    recieverUserId,
    videoId,
    videoTime,
  } = req.query;

  const invoice = await LNPayService.generateTipInvoice(amount, {
    destinationWalletId,
    tipperUserId,
    recieverUserId,
    videoId,
    videoTime,
  });
  res.status(200).json({ success: true, invoice });
};

exports.getWallet = async (req: any, res: any) => {
  const wallet = await LNPayService.getWallet();
  res.status(200).json({ success: true, wallet });
};
