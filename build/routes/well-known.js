"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wellKnown = void 0;
const ln_1 = require("../controllers/ln");
const express_1 = __importDefault(require("express"));
exports.wellKnown = express_1.default.Router();
exports.wellKnown.route("/lnurlp/:username").get(ln_1.initiateLnurlPayAddress);
