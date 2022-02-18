// const mongoose = require("mongoose");

import OpenNode from "../OpenNode";

// mongoose.connect(process.env.HISTORY_DBHOST, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

exports.getInvoice = async (req: any, res: any) => {
  const invoice = await OpenNode.createTipInvoice();
  console.log(invoice);

  res.status(200).json({ success: true, ...invoice });
};
