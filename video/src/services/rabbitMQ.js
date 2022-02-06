const amqp = require("amqplib");

class RabbitMQ {
  channel = null;

  async connect() {
    try {
      const connection = await amqp.connect(process.env.RABBIT); // Connect to the RabbitMQ server.
      this.channel = await connection.createChannel();
    } catch (err) {
      console.log("ERROR", err);
    }
  }

  close() {
    this.channel.close();
  }
}

module.exports = new RabbitMQ();
