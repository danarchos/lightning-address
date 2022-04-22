"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_ws_1 = __importDefault(require("express-ws"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const { app } = (0, express_ws_1.default)((0, express_1.default)());
const ln_1 = __importDefault(require("./routes/ln"));
const user_1 = require("./routes/user");
mongoose_1.default.connect("mongodb+srv://danramac:Fitzroy3065@cluster0.obak4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
const PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api", ln_1.default);
app.use("/api", user_1.userRouter);
app.listen(PORT, () => {
    console.log("LIGHTNING SERVICE RUNNING");
});
