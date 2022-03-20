const express = require("express");
const {
  createWallet,
  getWallet,
  generateTipInvoice,
} = require("../controllers/ln");

const { events, recieveCallback } = require("../controllers/events");

const router = express.Router();

router.route("/invoice").get(generateTipInvoice);
router.route("/getWallet").get(getWallet);
router.route("/createWallet").post(createWallet);
router.route("/wallet-recieve").post(recieveCallback);
router.ws("/events", events);

module.exports = router;
