const amqp = require("amqplib");
const ViewedVideo = require("../models/ViewedVideo");

class RabbitMQ {
  channel = null;
  queueName = "";

  async connect() {
    try {
      const connection = await amqp.connect(process.env.RABBIT); // Connect to the RabbitMQ server.
      this.channel = await connection.createChannel();
      console.log({ channel: this.channel });
      await this.assertExchange();
      this.queueName = await this.assertQueue();
      console.log({ queueName: this.queueName.queue });
      await this.channel.bindQueue(this.queueName.queue, "viewed", ""); // Bind the queue to the exchange.
      await this.channel.consume(
        this.queueName.queue,
        this.consumeViewedMessage.bind(this)
      );
    } catch (err) {
      console.log("ERROR", err);
    }
  }

  async assertExchange() {
    this.channel.assertExchange("viewed", "fanout");
  }

  async assertQueue() {
    return this.channel.assertQueue("", { exclusive: true });
  }

  async consumeViewedMessage(msg) {
    // Handler for coming messages.
    console.log("Received a 'viewed' message");
    const parsedMsg = JSON.parse(msg.content.toString()); // Parse the JSON message.
    console.log({ parsedMsg });

    // Save Video
    await ViewedVideo.create(parsedMsg);

    this.channel.ack(msg);
  }

  close() {
    this.channel.close();
  }
}

module.exports = new RabbitMQ();
