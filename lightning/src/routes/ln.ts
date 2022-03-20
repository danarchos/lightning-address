const express = require("express");
const {
  createWallet,
  getWallet,
  generateInvoice,
} = require("../controllers/ln");

const { events, recieveCallback } = require("../controllers/events");

const router = express.Router();

router.route("/invoice").get(generateInvoice);
router.route("/getWallet").get(getWallet);
router.route("/createWallet").post(createWallet);
router.route("/wallet-recieve").post(recieveCallback);
router.ws("/events", events);

module.exports = router;
