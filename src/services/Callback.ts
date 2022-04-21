import { EventEmitter } from "events";
require("dotenv").config();

export const CallbackEvents = {
    invoicePaid: "invoice-paid",
};

class CallbackService extends EventEmitter {
    recievedPayment = async (invoiceId: string) => {
        this.emit(CallbackEvents.invoicePaid, {
            invoiceId,
        });
    };
}

export default new CallbackService();
