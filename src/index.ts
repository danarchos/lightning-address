import express from "express";
import { initiateLnurlPayAddress } from "step1";
import { executeLnurlPayAddress } from "step2";

const app = express();
app.use(express.json());

// Step 1 - Default route hit from wallets that support pay-to-ln-address (.well-known/lnurlp/:username)
app.use("/.well-known/lnurlp/:username", initiateLnurlPayAddress);

// Step 2- The route provided to the callback in initiateLnurlPayAddress
app.use("/lnurlp", executeLnurlPayAddress);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Lightning Address server running", PORT);
});
