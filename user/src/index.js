require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

const user = require("./routes/user");
app.use("/api/v1", user);

app.listen(PORT, console.log(`USER Service up and running`));
