import express from "express";
import LightningService from "./LightningService";

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`LIGHTNING Service up and running`);
  const node = process.env.NODE_PUBKEY;
  const macaroon = process.env.MACAROON;
  const host = process.env.HOST;
  console.log(node, host, macaroon);
  LightningService.connect();
});
