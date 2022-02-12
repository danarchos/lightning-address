require("dotenv").config();
const RabbitMQ = require("./services/rabbitMQ");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

RabbitMQ.connect();

const PORT = process.env.PORT || 5000;

const history = require("./routes/lightning");
app.use("/api", history);

app.listen(PORT, console.log(`LIGHTNING Service up and running`));
