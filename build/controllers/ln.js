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
exports.lightningAddress = exports.payInvoice = exports.generateInvoice = exports.getTxs = exports.getWallet = void 0;
const Pay_1 = __importDefault(require("../services/Pay"));
const getWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield Pay_1.default.getWallet();
    res.status(200).json({ success: true, wallet });
});
exports.getWallet = getWallet;
const getTxs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const txs = yield Pay_1.default.getTxs();
    res.status(200).json({ success: true, txs });
});
exports.getTxs = getTxs;
const generateInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount } = req.query;
    if (!amount)
        return;
    const invoice = yield Pay_1.default.generateInvoice(parseInt(amount));
    res.status(200).json({ success: true, invoice });
});
exports.generateInvoice = generateInvoice;
const payInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { payRequest } = req.body;
    if (!payRequest)
        return;
    const result = yield Pay_1.default.payInvoice(payRequest);
    res.status(200).json({ success: true, result });
});
exports.payInvoice = payInvoice;
const lightningAddress = (req, res) => {
    if (!req.params.username) {
        res.status(404).json({ success: true, message: "Please provide username" });
    }
    const customDomainId = "cdom_QJfUaCsn";
    res.redirect(`https://${customDomainId}.lnpay.co/.well-known/lnurlp/${req.params.username}`);
};
exports.lightningAddress = lightningAddress;
