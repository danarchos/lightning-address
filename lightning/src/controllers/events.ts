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
        passThru: {
          destinationWalletId,
          tipperUserId,
          recieverUserId,
          videoId,
          videoTime,
        },
        num_satoshis,
      },
    },
  } = req.body;

  // Notify Client of confirmed payment
  await CallbackService.recievedPayment(id);

  // Forward the Podcasters cut
  const podcasterPercentage = 0.9;
  const amount_to_fwd = num_satoshis * podcasterPercentage;
  await LNPayService.forwardPayment(amount_to_fwd, destinationWalletId);

  // Add the tip to the videos history
  // Rabbit MQ Video Tip
  console.log("Store TIP with:", {
    destinationWalletId,
    tipperUserId,
    recieverUserId,
    videoId,
    videoTime,
  });

  await res.status(200).json({ success: true });
};

// Test websockets to see what happens when there are two of the same video listening
exports.events = (ws: any, req: any) => {
  const invoiceId = req.query.invoiceId;
  const paymentsListener = (info: any) => {
    if (info.invoiceId === invoiceId) {
      const event = { type: SocketEvents.invoicePaid, data: info };
      ws.send(JSON.stringify(event));
    }
  };

  CallbackService.on(CallbackEvents.invoicePaid, paymentsListener);

  ws.on("close", () => {
    CallbackService.off(CallbackEvents.invoicePaid, paymentsListener);
  });
};
