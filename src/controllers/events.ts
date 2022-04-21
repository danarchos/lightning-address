import CallbackService, { CallbackEvents } from "../services/Callback";

export const SocketEvents = {
    invoiceUpdated: "invoice-updated",
    invoicePaid: "invoice-paid",
    bountyCreated: "bounty-created",
};

export const receiveCallback = async (req: any, res: any) => {
    const {
        data: {
            wtx: {
                lnTx: { id },
            },
        },
    } = req.body;

    console.log('callback initiated')

    // Notify Client of confirmed payment
    // await CallbackService.recievedPayment(id);

    await res.status(200).json({ success: true });
};

// Test websockets to see what happens when there are two of the same video listening
export const events = (ws: any, req: any) => {
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
