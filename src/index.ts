import express from "express";
import expressWs from "express-ws";
import { lnRouter } from './routes/ln';
import { userRouter } from './routes/user'
import cors from "cors"


const PORT = process.env.PORT || 5000;
const { app } = expressWs(express());

app.use(express.json());
app.use(cors());

app.use("/api", lnRouter);
app.use("/api", userRouter);

app.listen(PORT, () => {
  console.log("LIGHTNING SERVICE RUNNING");
});
