import express from "express";
import expressWs from "express-ws";

import cors from "cors";
import mongoose from "mongoose";

const { app } = expressWs(express());

import lnRouter from "./routes/ln";
import { userRouter } from "./routes/user";

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.obak4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
);

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/lightning", lnRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log("LIGHTNING SERVICE RUNNING ON PORT", PORT);
});
