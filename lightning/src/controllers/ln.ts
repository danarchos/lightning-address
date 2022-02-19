// const mongoose = require("mongoose");

import LNPayService, { LNPayEvents } from "../LNPayService";

export const SocketEvents = {
  invoiceUpdated: "invoice-updated",
  invoicePaid: "invoice-paid",
  bountyCreated: "bounty-created",
};

// mongoose.connect(process.env.HISTORY_DBHOST, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

exports.generateInvoice = async (req: any, res: any) => {
  const invoice = await LNPayService.generateInvoice();
  res.status(200).json({ success: true, invoice });
};

exports.getWallet = async (req: any, res: any) => {
  const wallet = await LNPayService.getWallet();
  res.status(200).json({ success: true, wallet });
};

exports.trigger = async (req: any, res: any) => {
  const result = await LNPayService.trigger();
  res.status(200).json({ success: true });
};

// Test websockets to see what happens when there are two of the same video listening
exports.events = (ws: any, req: any) => {
  console.log("connected");
  const sessionId = req.query.sessionId;
  const paymentsListener = (info: any) => {
    if (info.videoId === "1234") {
      const event = { type: SocketEvents.invoicePaid, data: info };
      ws.send(JSON.stringify(event));
    }
  };

  LNPayService.on(LNPayEvents.invoicePaid, paymentsListener);

  ws.on("close", () => {
    LNPayService.off(LNPayEvents.invoicePaid, paymentsListener);
  });
};
