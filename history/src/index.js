require("dotenv").config();
const amqp = require("amqplib");
const RabbitMQ = require("./services/rabbitMQ");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

RabbitMQ.connect();

const PORT = process.env.PORT || 5000;

const history = require("./routes/history");
app.use("/api/v1", history);

function consumeViewedMessage(msg) {
  // Handler for coming messages.
  console.log("Received a 'viewed' message");
  const parsedMsg = JSON.parse(msg.content.toString()); // Parse the JSON message.
  console.log({ msg, parsedMsg });
}

try {
  await messageChannel.assertExchange("viewed", "fanout");
  await messageChannel.assertQueue("", { exclusive: true });

  const queueName = response.queue;
  console.log(`Created queue ${queueName}, binding it to "viewed" exchange.`);
  await messageChannel.bindQueue(queueName, "viewed", ""); // Bind the queue to the exchange.
  await messageChannel.consume(queueName, consumeViewedMessage); // Start receiving messages from the anonymous queue.
} catch (err) {
  console.log({ err });
}

app.listen(PORT, console.log(`HISTORY Service up and running`));
