const express = require("express");
const {
  getWallet,
  generateInvoice,
  trigger,
  events,
} = require("../controllers/ln");

const router = express.Router();

router.route("/generateInvoice").get(generateInvoice);
router.route("/getWallet").get(getWallet);
router.route("/trigger").post(trigger);
router.ws("/events", events);

module.exports = router;
