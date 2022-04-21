import mongoose from "mongoose"

const Schema = mongoose.Schema;

const ResetCodeSchema = new Schema({
    email: { type: String, required: true, unique: true },
    code: { type: String, required: true },
});


export const ResetCode = mongoose.model("ResetCode", ResetCodeSchema);
