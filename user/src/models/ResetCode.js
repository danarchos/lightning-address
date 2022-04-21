const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ResetCodeSchema = new Schema({
    email: { type: String, required: true, unique: true },
    code: { type: String, required: true },
});


const ResetCode = mongoose.model("ResetCode", ResetCodeSchema);

module.exports = ResetCode;
