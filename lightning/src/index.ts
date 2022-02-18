import express from "express";
import expressWs from "express-ws";
import OpenNode, { OpenNodeEvents } from "./OpenNode";

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
  app.ws("/events", (ws, req) => {
    const bountyToListenTo = req.query.bountyId;

    const paymentsListener = (info: any) => {
      if (info.bountyId === bountyToListenTo) {
        const event = { type: SocketEvents.invoiceUpdated, data: info };
        ws.send(JSON.stringify(event));
      }
    };

    OpenNode.on(OpenNodeEvents.invoicePaid, paymentsListener);

    ws.on("close", () => {
      OpenNode.off(OpenNodeEvents.invoicePaid, paymentsListener);
    });
  });
});
