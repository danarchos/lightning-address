require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

const video = require("./routes/video");
app.use("/api/v1", video);

app.listen(PORT, console.log(`VIDEO Service up and running`));
