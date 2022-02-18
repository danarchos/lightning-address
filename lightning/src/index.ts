import express from "express";
const opennode = require("opennode");

const app = express();

const PORT = process.env.PORT || 5000;

const charge = async () => {
  await opennode.setCredentials(process.env.OPENNODE_API_KEY_DEV, "dev");
  try {
    const charge = await opennode.createCharge({
      amount: 10.5,
      currency: "USD",
      callback_url: "https://example.com/webhook/opennode",
      auto_settle: false,
    });
    console.log({ charge });
  } catch (error: any) {
    console.error(`${error.status} | ${error.message}`);
  }
};

app.listen(PORT, () => {
  console.log(process.env.OPENNODE_API_KEY_DEV);
  charge();
});
