const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TipSchema = new Schema({
  videoId: String,
  userId: String,
  amount: Number,
});

const Tip = mongoose.model("Tip", TipSchema);

module.exports = Tip;
