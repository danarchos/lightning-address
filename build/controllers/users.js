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
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeEmail = exports.changeUsername = exports.checkUsername = exports.userInfo = void 0;
const asyncHandlerFn_1 = require("../middlewares/asyncHandlerFn");
const User_1 = require("../models/User");
// GET user
exports.userInfo = (0, asyncHandlerFn_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    if (!id) {
        res.status(404).json({ success: false, message: "No User id Provided" });
    }
    let user;
    user = yield User_1.User.findOne({ id });
    if (!user) {
        res.status(400).json({ success: false, message: "No user found" });
        return;
    }
    res.status(200).json({
        success: true,
        user: { email: user.email, username: user.username, id: user.id },
    });
}));
exports.checkUsername = (0, asyncHandlerFn_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.query;
    const foundUser = yield User_1.User.findOne({ username });
    if (foundUser) {
        res.status(200).json({ taken: true });
        return;
    }
    res.status(200).json({ taken: false });
}));
// Update username
exports.changeUsername = (0, asyncHandlerFn_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    if (!process.env.JWT_SECRET) {
        res.status(500).send("Internal server error!");
        return;
    }
    try {
        yield User_1.User.findOneAndUpdate({ id: req.decoded.id }, { username });
        res.status(200).json({
            success: true,
            message: "Successfully updated username",
        });
    }
    catch (err) {
        res.status(500).send("Internal server error!");
    }
}));
// Update email
exports.changeEmail = (0, asyncHandlerFn_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!process.env.JWT_SECRET) {
        res.status(500).json({ success: false, message: "Server Error" });
        return;
    }
    if (!req.decoded.userId) {
        res.status(404).json({
            success: false,
            message: "Failed to change email",
        });
        return;
    }
    try {
        yield User_1.User.findOneAndUpdate({ id: req.decoded.userId }, { email });
        res.status(200).json({
            success: true,
            message: "Successfully updated email",
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Failed to change email" });
    }
}));
