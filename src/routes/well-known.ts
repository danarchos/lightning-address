import express from "express";

import { lightningAddress } from "../controllers/ln";

export const wellKnown = express.Router();

wellKnown.route("/lnurlp/:username").get(lightningAddress);
