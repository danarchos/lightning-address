import { EventEmitter } from "events";
require("dotenv").config();
const opennode = require("opennode");

export const OpenNodeEvents = {
  invoiceUpdated: "invoice-updated",
  invoicePaid: "invoice-paid",
};

class OpenNode extends EventEmitter {
  constructor() {
    super();
    opennode.setCredentials(process.env.OPENNODE_API_KEY_DEV, "dev");
  }

  createTipInvoice = async () => {
    try {
      const charge = await opennode.createCharge({
        amount: 10.5,
        currency: "USD",
        callback_url: "https://example.com/webhook/opennode",
        auto_settle: false,
      });
      return charge;
    } catch (error: any) {
      console.error(`${error.status} | ${error.message}`);
    }
  };

  notification = async () => {
    this.emit(OpenNodeEvents.invoicePaid, {
      paramOne: "test",
      paramTwo: "test",
    });
  };
}

export default new OpenNode();
