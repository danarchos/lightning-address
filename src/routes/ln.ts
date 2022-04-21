const express = require("express");
const {
  getWallet,
} = require("../controllers/ln");


export const lnRouter = express.Router();

lnRouter.route("/getWallet").get(getWallet);

