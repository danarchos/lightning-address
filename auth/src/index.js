require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

const auth = require("./routes/auth");
app.use("/api", auth);

app.listen(
  PORT,
  console.log(`AUTH Service up and running ${process.env.JWT_EXPIRE}`)
);
