const express = require("express");
const {
  createWallet,
  getWallet,
  generateInvoice,
} = require("../controllers/ln");

const { events, trigger } = require("../controllers/events");

const router = express.Router();

router.route("/generateInvoice").get(generateInvoice);
router.route("/getWallet").get(getWallet);
router.route("/createWallet").post(createWallet);
router.route("/trigger").post(trigger);
router.ws("/events", events);

module.exports = router;
