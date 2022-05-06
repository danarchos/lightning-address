import express from "express";
import cors from "cors";
import { router } from "./routes";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api", router);

app.listen(PORT, () => {
  console.log("LIGHTNING SERVICE RUNNING ON PORT", PORT);
});
