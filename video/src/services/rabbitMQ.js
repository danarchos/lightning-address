const amqp = require("amqplib");

class RabbitMQ {
  channel = null;

  async connect() {
    try {
      const connection = await amqp.connect(process.env.RABBIT); // Connect to the RabbitMQ server.
      this.channel = await connection.createChannel();
      await this.assertExchange();
    } catch (err) {
      console.log("ERROR", err);
    }
  }

  async assertExchange() {
    const response = await this.channel.assertExchange("viewed", "fanout");
    console.log({ response });
  }

  close() {
    this.channel.close();
  }
}

module.exports = new RabbitMQ();
