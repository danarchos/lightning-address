const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  userId: String,
  amount: Number,
});

const Transactions = mongoose.model("Transactions", TransactionSchema);

module.exports = Transactions;
