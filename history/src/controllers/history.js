const mongoose = require("mongoose");
const Like = require("../models/Like");

mongoose.connect(process.env.HISTORY_DBHOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.videoViewed = async (req, res) => {
  const msg = "";
  const parsedMsg = JSON.parse(msg).content.toString();
  res.status(200).json({ success: true, message: "Hello World" });
};

exports.addLike = async (req, res) => {
  const { videoId, userId, like } = req.body;

  try {
    const query = { videoId, userId };
    const options = { upsert: true, rawResult: true };

    await Like.findOneAndUpdate(query, { like }, options);
    res.status(200).json({ success: true, like, videoId, userId });
  } catch (err) {
    console.log("Failed to add like");
    res.status(500).json({ success: false });
  }
};

exports.likeInfo = async (req, res) => {
  const { videoId, userId } = req.query;

  try {
    numLikes = await Like.count({ like: true });
    numDislikes = await Like.count({ like: false });
    hasUserLiked = await Like.findOne({ userId, videoId, like: true });
    hasUserDisliked = await Like.findOne({ userId, videoId, like: false });

    console.log({
      videoId,
      userId,
      numLikes,
      numDislikes,
      hasUserLiked,
      hasUserDisliked,
    });

    res.status(200).json({
      success: true,
      videoId,
      userId,
      numLikes,
      numDislikes,
      hasUserDisliked,
      hasUserLiked,
    });
  } catch (err) {
    console.log("Failed to get like info");
    res.status(500).json({ success: false });
  }
};
