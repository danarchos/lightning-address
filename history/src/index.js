require("dotenv").config();
const amqp = require("amqplib");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const history = require("./routes/history");
app.use("/api/v1", history);

// Connect Rabbit
// const connection = await amqp.connect(RABBIT); // Connect to the RabbitMQ server.
// const channel = await connection.createChannel();

// await channel.assertQueue("viewed", {});
// await channel.consume("viewed", consumeViewedMessage);

// function consumeViewedMessage(msg) {
//   // Handler for coming messages.
//   console.log("Received a 'viewed' message");
//   const parsedMsg = JSON.parse(msg.content.toString()); // Parse the JSON message.
//   console.log({ msg, parsedMsg });
// }

app.listen(PORT, console.log(`HISTORY Service up and running`));
