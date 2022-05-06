import { Request, Response} from "express";

// Method to initiate a payment to a lightning address
export const initiateLnurlPayAddress = async (req: Request, res: Response) => {
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
  