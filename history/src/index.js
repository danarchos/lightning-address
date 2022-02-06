require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

const history = require("./routes/history");
app.use("/api/v1", history);

app.listen(PORT, console.log(`HISTORY Service up and running`));
