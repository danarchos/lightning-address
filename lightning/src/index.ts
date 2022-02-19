import express from "express";
import expressWs from "express-ws";

const cors = require("cors");

export const SocketEvents = {
  invoiceUpdated: "invoice-updated",
  invoicePaid: "invoice-paid",
  bountyCreated: "bounty-created",
};

const PORT = process.env.PORT || 5000;
const { app } = expressWs(express());

app.use(cors());

const lnRoutes = require("./routes/ln");
app.use("/api", lnRoutes);

app.listen(PORT, () => {
  console.log("LIGHTNING SERVICE RUNNING");
});
