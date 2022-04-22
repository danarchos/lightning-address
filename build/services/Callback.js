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
exports.CallbackEvents = void 0;
const events_1 = require("events");
require("dotenv").config();
exports.CallbackEvents = {
    invoicePaid: "invoice-paid",
};
class CallbackService extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.recievedPayment = (invoiceId) => __awaiter(this, void 0, void 0, function* () {
            this.emit(exports.CallbackEvents.invoicePaid, {
                invoiceId,
            });
        });
    }
}
exports.default = new CallbackService();
