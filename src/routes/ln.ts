const express = require("express");
const {
  createWallet,
  getWallet,
} = require("../controllers/ln");


export const lnRouter = express.Router();

lnRouter.route("/getWallet").get(getWallet);
lnRouter.route("/createWallet").post(createWallet);

