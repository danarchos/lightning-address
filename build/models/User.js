"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    wallet: {
        id: { type: String, required: true },
        masterKey: { type: String, required: true },
        recieveKey: { type: String, required: true },
        readKey: { type: String, required: true },
        lnUrlWithdrawKey: { type: String, required: true },
        lnUrlPayKey: { type: String, required: true },
    },
    lnAddress: {
        address: String,
        id: String,
        description: String,
        min: String,
        max: String,
        createdAt: String,
        lnurlDecoded: String,
        domainId: String,
        domainDisplayName: String,
        statusType: String,
        status: String,
        statusDisplay: String,
    },
});
// A method that enables the comparison of password that have been salted
// https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcryptjs_1.default.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err)
            return cb(err);
        cb(null, isMatch);
    });
};
exports.User = mongoose_1.default.model("User", UserSchema);
