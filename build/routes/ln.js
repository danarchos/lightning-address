"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ln_1 = require("../controllers/ln");
const events_1 = require("../controllers/events");
const lnRouter = express_1.default.Router();
lnRouter.route("/wallet").get(ln_1.getWallet);
lnRouter.route("/get-txs").get(ln_1.getTxs);
lnRouter.route("/invoice").get(ln_1.generateInvoice);
lnRouter.route("/pay-invoice").post(ln_1.payInvoice);
lnRouter.route("/wallet-recieve").post(events_1.receiveCallback);
lnRouter.ws("/events", events_1.events);
exports.default = lnRouter;
