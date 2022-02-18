const express = require("express");
const { getInvoice } = require("../controllers/ln");

const router = express.Router();

router.route("/getInvoice").get(getInvoice);

module.exports = router;
