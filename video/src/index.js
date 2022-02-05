require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

const auth = require("./routes/video");
app.use("/api/v1", auth);

app.listen(PORT, console.log(`VIDEO Service up and running`));