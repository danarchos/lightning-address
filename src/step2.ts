import { createHash } from "crypto";
import { Request, Response} from "express";


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
  