const express = require("express");
const {
  createWallet,
  getWallet,
  generateTipInvoice,
} = require("../controllers/ln");

const { events, recieveCallback } = require("../controllers/events");

const router = express.Router();

router.route("/getWallet").get(getWallet);
router.route("/createWallet").post(createWallet);

module.exports = router;
