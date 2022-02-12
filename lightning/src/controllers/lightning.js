// const mongoose = require("mongoose");
const axios = require("axios");

// mongoose.connect(process.env.LIGHTNING_DBHOST, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

exports.generateInvoice = async (req, res) => {
  // 1. Make a call to video service to see "Stakeholders" of the video
  // 2. With connected ln node, create an invoice.
  // 3. Store this unconfirmed transaction/invoice in ln database, along with "Outputs" (Each amount to each stakeholder), and Fee amount
  // 4. Send the invoice to front end and set up websocket
};
