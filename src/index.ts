import { createHash } from "crypto";
import express, { Request, Response} from "express";

const app = express();
app.use(express.json());

// Method to initiate a payment to a lightning address
const initiateLnurlPayAddress = async (req: Request, res: Response) => {
  if (!req.params.username) {
    res
      .status(404)
      .json({ success: false, message: "Please provide username" });
  }

  const response = {
    minSendable: 1000,
    maxSendable: 10000000,
    tag: "payRequest",
    metadata: `[["text/plain","Some Metadata"]]`,
    callback: `http://localhost:5000/lnurlp/satoshi`,
  };

  res.status(200).json({ ...response });
};

// Method that is triggered on the callback
export const executeLnurlPayAddress = async (req: Request, res: Response) => {
  const { amount } = req.query;

  if (!amount) {
    res.status(400).json({
      success: false,
      message: "Minimum amount is 1 Satoshi. Pay up, my dude.",
    });
    return;
  }
  const inSatoshis = parseInt(amount as string) / 1000;

  if (inSatoshis < 1) {
    res.status(400).json({
      success: false,
      message: "Minimum amount is 1 Satoshi. Pay up, my dude.",
    });
    return;
  }

  const descriptionHash = createHash("sha256")
    .update(`[["text/plain","${req.params.walletId}"]]`)
    .digest("hex");

  const invoice = // GENERATE AN INVOICE FROM YOUR NODE

  // And pass it below
  res.status(200).json({ pr: "", routes: [] });
};



// Default route hit from wallets that support pay-to-ln-address (.well-known/lnurlp/:username)
app.use("/.well-known/lnurlp/:username", initiateLnurlPayAddress);

// The route provided to the callback in initiateLnurlPayAddress
app.use("/lnurlp", executeLnurlPayAddress);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Lightning Address server running", PORT);
});
