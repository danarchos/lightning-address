const mongoose = require("mongoose");
const Video = require("../models/Video");
const RabbitMQ = require("../services/rabbitMQ");

mongoose.connect(process.env.VIDEO_DBHOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Save Video
exports.save = async (req, res) => {
  const { username, userId } = req.decoded;
  const { lightningAddress, url, title } = req.body;

  try {
    const newVideo = await Video.create({
      username,
      userId,
      lightningAddress,
      url,
      title,
    });
    if (!newVideo) {
      res.status(400).json({ success: false });
      return;
    }
    res.status(200).json({ success: true, body: req.body });
  } catch (err) {
    res.status(500).json({ success: false, message: "Incorrect data fields" });
  }
};

// View Video
exports.view = async (req, res) => {
  const jsonMsg = JSON.stringify(req.body);
  try {
    await RabbitMQ.channel.publish("viewed", "", Buffer.from(jsonMsg)); // Publish message to the "viewed" exchange.
  } catch (err) {
    console.log({ err });
  }
  res.status(200).json({ success: true });
};
