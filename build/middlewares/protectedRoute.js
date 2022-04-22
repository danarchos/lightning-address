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
exports.protect = void 0;
const jwt = require("jsonwebtoken");
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        return next({
            message: "You need to be logged in to visit this route",
            statusCode: 401,
        });
    }
    const token = req.headers.authorization.replace("Bearer", "").trim();
    try {
        const decoded = yield jwt.verify(token, process.env.JWT_SECRET);
        req.decoded = decoded;
        next();
    }
    catch (err) {
        console.log({ err });
        next({
            message: "You need to be logged in to visit this route",
            statusCode: 403,
        });
    }
});
exports.protect = protect;
