import { initiateLnurlPayAddress } from "../controllers/ln";
import express from "express";

export const wellKnown = express.Router();

wellKnown.route("/lnurlp/:username").get(initiateLnurlPayAddress);
