const mongoose = require("mongoose");
const Video = require("../models/Video");
const RabbitMQ = require("../services/rabbitMQ");

mongoose.connect(process.env.VIDEO_DBHOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Save Video
exports.save = async (req, res) => {
  const { username, userId, walletId } = req.decoded;
  const { url, title } = req.body;

  try {
    const newVideo = await Video.create({
      username,
      userId,
      walletId,
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

exports.videosByUser = async (req, res) => {
  const { userId } = req.query;
  console.log("hitting", userId);
  try {
    console.log("hit this with user", userId);
    const results = await Video.find({ userId });
    console.log({ results });
    res.status(200).json({ success: true, results });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ success: false });
  }
};

exports.videoById = async (req, res) => {
  const { id } = req.query;
  try {
    console.log("hit this video id", id);
    const result = await Video.findById(id);
    res.status(200).json({ success: true, result });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ success: false });
  }
};
