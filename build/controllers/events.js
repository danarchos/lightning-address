"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.events = exports.receiveCallback = exports.SocketEvents = void 0;
const Callback_1 = __importStar(require("../services/Callback"));
exports.SocketEvents = {
    invoiceUpdated: "invoice-updated",
    invoicePaid: "invoice-paid",
    bountyCreated: "bounty-created",
};
const receiveCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: { wtx: { lnTx: { id }, }, }, } = req.body;
    console.log('callback initiated');
    // Notify Client of confirmed payment
    // await CallbackService.recievedPayment(id);
    yield res.status(200).json({ success: true });
});
exports.receiveCallback = receiveCallback;
// Test websockets to see what happens when there are two of the same video listening
const events = (ws, req) => {
    const invoiceId = req.query.invoiceId;
    const paymentsListener = (info) => {
        if (info.invoiceId === invoiceId) {
            const event = { type: exports.SocketEvents.invoicePaid, data: info };
            ws.send(JSON.stringify(event));
        }
    };
    Callback_1.default.on(Callback_1.CallbackEvents.invoicePaid, paymentsListener);
    ws.on("close", () => {
        Callback_1.default.off(Callback_1.CallbackEvents.invoicePaid, paymentsListener);
    });
};
exports.events = events;
