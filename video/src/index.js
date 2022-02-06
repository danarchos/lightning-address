require("dotenv").config();
const RabbitMQ = require("./services/rabbitMQ");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

RabbitMQ.connect();

const video = require("./routes/video");
app.use("/api/v1", video);

app.listen(PORT, console.log(`VIDEO Service up and running`));
