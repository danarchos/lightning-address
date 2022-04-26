import express from "express";
import {
  getWallet,
  generateInvoice,
  payInvoice,
  getTxs,
  executeLnurlPayAddress,
} from "../controllers/ln";
import { events, receiveCallback } from "../controllers/events";

const lnRouter = express.Router();

lnRouter.route("/wallet").get(getWallet);
lnRouter.route("/get-txs").get(getTxs);
lnRouter.route("/invoice").get(generateInvoice);
lnRouter.route("/pay-invoice").post(payInvoice);
lnRouter.route("/wallet-recieve").post(receiveCallback);
lnRouter.route("/execute-lnurl-pay-address").get(executeLnurlPayAddress);
lnRouter.ws("/events", events);

export default lnRouter;
