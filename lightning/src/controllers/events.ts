import LNPayService from "../services/Pay";
import CallbackService, { CallbackEvents } from "../services/Callback";

export const SocketEvents = {
  invoiceUpdated: "invoice-updated",
  invoicePaid: "invoice-paid",
  bountyCreated: "bounty-created",
};

exports.recieveCallback = async (req: any, res: any) => {
  const {
    data: {
      wtx: {
        lnTx: { id },
      },
    },
  } = req.body;
  await CallbackService.recievedPayment(id);
  res.status(200).json({ success: true });
};

// Test websockets to see what happens when there are two of the same video listening
exports.events = (ws: any, req: any) => {
  const invoiceId = req.query.invoiceId;
  console.log("hey", invoiceId);
  const paymentsListener = (info: any) => {
    console.log("hi", info.invoiceId);
    if (info.invoiceId === invoiceId) {
      console.log("ho");
      const event = { type: SocketEvents.invoicePaid, data: info };
      ws.send(JSON.stringify(event));
    }
  };

  CallbackService.on(CallbackEvents.invoicePaid, paymentsListener);

  ws.on("close", () => {
    CallbackService.off(CallbackEvents.invoicePaid, paymentsListener);
  });
};
