import express from "express";
import {
  getWallet,
  generateInvoice,
  payInvoice,
} from "../controllers/ln";
import { events, receiveCallback } from '../controllers/events'

const lnRouter = express.Router();

lnRouter.route("/getWallet").get(getWallet);
lnRouter.route("/invoice").get(generateInvoice);
lnRouter.route("/pay-invoice").post(payInvoice);
lnRouter.route("/wallet-recieve").post(receiveCallback);
lnRouter.ws("/events", events);

export default lnRouter

