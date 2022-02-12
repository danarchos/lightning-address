const express = require("express");
const { generateInvoice } = require("../controllers/lightning");

const router = express.Router();

router.route("/pay").post(generateInvoice);

module.exports = router;
