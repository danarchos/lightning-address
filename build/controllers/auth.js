"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.veryifyDecodeUser = exports.resetNewPassword = exports.authenticateResetCode = exports.initiateResetPassword = exports.login = exports.signup = void 0;
const asyncHandlerFn_1 = require("../middlewares/asyncHandlerFn");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
const Pay_1 = __importDefault(require("../services/Pay"));
const JWT_EXPIRE = process.env.JWT_EXPIRE;
const JWT_SECRET = process.env.JWT_SECRET;
const User_1 = require("../models/User");
const ResetCode_1 = require("../models/ResetCode");
// SIGN UP - Creates user model, adds salt to password, creates a JWT
exports.signup = (0, asyncHandlerFn_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!JWT_SECRET) {
        res.status(500).json({ success: false, message: "Server Error" });
        return;
    }
    try {
        const newUser = new User_1.User(req.body);
        const result = yield Pay_1.default.createWallet(req.body.username);
        newUser.wallet = Object.assign({}, result);
        const salt = yield bcryptjs_1.default.genSalt(10);
        newUser.password = yield bcryptjs_1.default.hash(newUser.password, salt);
        const user = yield newUser.save();
        const payload = {
            userId: user._id,
            walletId: user.wallet.id,
            recieveKey: user.wallet.recieveKey,
        };
        const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, {
            expiresIn: JWT_EXPIRE,
        });
        res.status(200).json({ success: true, token, expiresIn: JWT_EXPIRE });
    }
    catch (err) {
        console.log({ err });
    }
}));
// LOGIN
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
    if (!JWT_SECRET) {
        res.status(500).json({
            success: false,
            message: "Server Error, can't create JWT Token",
        });
        return;
    }
    try {
        let user;
        if (email)
            user = yield User_1.User.findOne({ email });
        const passwordMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ success: false, message: "Incorrect Password" });
            return;
        }
        const payload = {
            userId: user._id,
            walletId: user.wallet.id,
            recieveKey: user.wallet.recieveKey,
        };
        const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, {
            expiresIn: JWT_EXPIRE,
        });
        res
            .status(200)
            .json({ success: true, token, message: "Successfully logged in" });
    }
    catch (err) {
        console.log("Error with auth -> /login endpoint");
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.login = login;
const initiateResetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email } = req.body;
    // Check email exists in db
    const foundUser = yield User_1.User.findOne({ email });
    if (!foundUser) {
        res
            .status(404)
            .json({ success: false, message: "No user with that email address" });
        return;
    }
    // Delete old codes with that email
    yield ResetCode_1.ResetCode.deleteMany({ email });
    // Generate a code
    const randomBytes = crypto_1.default.randomBytes(2);
    const code = parseInt(randomBytes.toString("hex"), 16);
    // Save the code in the database with the userid and username, and email
    const newCode = new ResetCode_1.ResetCode({ email, code });
    yield newCode.save();
    // Send the code to the email adddress
    mail_1.default.setApiKey((_a = process.env.SENDGRID_API_KEY) !== null && _a !== void 0 ? _a : "");
    const msg = {
        to: "dr.mcgrane@gmail.com",
        from: "dr.mcgrane@gmail.com",
        subject: "Reset your password",
        text: code.toString(),
    };
    mail_1.default
        .send(msg)
        .then(() => {
        console.log("Email sent");
    })
        .catch((error) => {
        console.error(error);
    });
});
exports.initiateResetPassword = initiateResetPassword;
const authenticateResetCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, email } = req.body;
    const foundCode = yield ResetCode_1.ResetCode.findOne({ email, code });
    if (!foundCode) {
        res.status(401).json({ success: false, message: "Code incorrect" });
        return;
    }
    res.status(201).json({ success: true, message: "Code correct" });
});
exports.authenticateResetCode = authenticateResetCode;
const resetNewPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, email, newPassword } = req.body;
    const foundCode = yield ResetCode_1.ResetCode.findOne({ email, code });
    if (!foundCode) {
        res.status(401).json({ success: false, message: "Code incorrect" });
        return;
    }
    const salt = yield bcryptjs_1.default.genSalt(10);
    const newPasswordWithSalt = yield bcryptjs_1.default.hash(newPassword, salt);
    const newPass = yield User_1.User.findOneAndUpdate({ email }, { password: newPasswordWithSalt });
    if (newPass) {
        yield ResetCode_1.ResetCode.findOneAndDelete({ email, code });
    }
    res.status(200).json({ success: true, message: "Password Updated" });
});
exports.resetNewPassword = resetNewPassword;
const veryifyDecodeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const decoded = yield jsonwebtoken_1.default.verify(req.query.token, (_b = process.env.JWT_SECRET) !== null && _b !== void 0 ? _b : "");
        console.log({ decoded });
        res.status(200).json({
            success: true,
            message: "Verify decode loud and clear over",
            decoded,
        });
    }
    catch (err) {
        console.log({ err });
        res.status(403).json({
            success: true,
            message: "You cannot perform this upload.",
        });
    }
});
exports.veryifyDecodeUser = veryifyDecodeUser;
