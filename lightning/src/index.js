require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const lightning = require("./routes/lightning");
app.use("/api", lightning);

app.listen(PORT, console.log(`LIGHTNING Service up and running`));
