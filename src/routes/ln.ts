import express from "express";
import {
  getWallet,
  generateInvoice,
  payInvoice,
  getTxs,
  createLnAddress,
} from "../controllers/ln";
import { events, receiveCallback } from "../controllers/events";

const lnRouter = express.Router();

lnRouter.route("/wallet").get(getWallet);
lnRouter.route("/create-ln-address").post(createLnAddress);
lnRouter.route("/get-txs").get(getTxs);
lnRouter.route("/invoice").get(generateInvoice);
lnRouter.route("/pay-invoice").post(payInvoice);
lnRouter.route("/wallet-recieve").post(receiveCallback);
lnRouter.ws("/events", events);

export default lnRouter;
