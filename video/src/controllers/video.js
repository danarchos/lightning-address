const mongoose = require("mongoose");
const axios = require("axios");
const Video = require("../models/Video");
const RabbitMQ = require("../services/rabbitMQ");

mongoose.connect(process.env.VIDEO_DBHOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Save Video
exports.save = async (req, res) => {
  const { username, userId, recieveKey, walletId } = req.decoded;
  const { url, title } = req.body;

  try {
    const newVideo = await Video.create({
      username,
      userId,
      recieveKey,
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

  try {
    const results = await Video.find({ userId });
    res.status(200).json({ success: true, results });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ success: false });
  }
};

exports.videoById = async (req, res) => {
  const { id, userId } = req.query;

  try {
    const result = await Video.findById(id);

    const {
      data: { numLikes, numDislikes, hasUserDisliked, hasUserLiked },
    } = await axios.get(
      `${process.env.HISTORY_API_BASE}/stats?videoId=${id}&userId=${userId}`
    );

    res.status(200).json({
      success: true,
      _id: result.id,
      title: result.title,
      url: result.url,
      author: {
        username: result.username,
        userId: result.userId,
        walletId: result.walletId,
        recieveKey: result.recieveKey,
      },
      stats: {
        numLikes,
        numDislikes,
        hasUserDisliked,
        hasUserLiked,
        comments,
      },
    });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ success: false });
  }
};

exports.like = async (req, res) => {
  const { videoId, userId } = req.body;

  try {
    const newLike = await axios.post(`${process.env.HISTORY_API_BASE}/like`, {
      like: true,
      videoId,
      userId,
    });

    res.status(200).json({ ...newLike.data });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ success: false });
  }
};

exports.dislike = async (req, res) => {
  const { videoId, userId } = req.body;
  try {
    const newDislike = await axios.post(
      `${process.env.HISTORY_API_BASE}/like`,
      { like: false, videoId, userId }
    );

    res.status(200).json({ ...newDislike.data });
  } catch (err) {
    console.log({ err });
    res.status(500).json({ success: false });
  }
};
