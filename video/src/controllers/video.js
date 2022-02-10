const asyncHandler = require("../middlewares/asyncHandlerFn");
const mongoose = require("mongoose");
const Video = require("../models/Video");
const RabbitMQ = require("../services/rabbitMQ");

mongoose.connect(process.env.VIDEO_DBHOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Save Video
exports.save = async (req, res) => {
  Video.create(req.body);

  res.status(200).json({ success: true, body: req.body });
};

// Save Video
exports.view = async (req, res) => {
  const jsonMsg = JSON.stringify(req.body);
  try {
    await RabbitMQ.channel.publish("viewed", "", Buffer.from(jsonMsg)); // Publish message to the "viewed" exchange.
  } catch (err) {
    console.log({ err });
  }
  res.status(200).json({ success: true });
};
