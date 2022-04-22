"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetCode = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ResetCodeSchema = new Schema({
    email: { type: String, required: true, unique: true },
    code: { type: String, required: true },
});
exports.ResetCode = mongoose_1.default.model("ResetCode", ResetCodeSchema);
