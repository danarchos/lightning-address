const mongoose = require("mongoose");
const Comment = require("../models/Comment");
const CommentUpvote = require("../models/CommentUpvote");
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

exports.getStats = async (req, res) => {
  const { videoId, userId } = req.query;

  try {
    const numLikes = await Like.count({ like: true });
    const numDislikes = await Like.count({ like: false });
    const hasUserLiked = await Like.findOne({ userId, videoId, like: true });
    const hasUserDisliked = await Like.findOne({
      userId,
      videoId,
      like: false,
    });

    // Comments and whether the user has upvoted them.
    const commentsData = await Comment.find({ videoId });
    const allCommentIds = commentsData.map((comment) => comment.id);
    const allUpvotedComments = await CommentUpvote.find({
      commentId: { $in: allCommentIds },
      userId,
    });
    const allUpvotedCommentsIds = allUpvotedComments.map(
      (comment) => comment.commentId
    );
    const commentsWithHasUpvoted = commentsData.map((comment) => {
      return {
        id: comment.id,
        videoId: comment.videoId,
        userId: comment.userId,
        text: comment.comment,
        upvotes: comment.upvotes,
        hasUserUpvoted: allUpvotedCommentsIds.includes(comment.id)
          ? true
          : false,
      };
    });

    const commentsWithSortOrder = commentsWithHasUpvoted.sort(
      (a, b) => b.upvotes - a.upvotes
    );

    res.status(200).json({
      success: true,
      videoId,
      userId,
      numLikes,
      numDislikes,
      hasUserDisliked,
      hasUserLiked,
      comments: commentsWithSortOrder,
    });
  } catch (err) {
    console.log("Failed to get stats");
    res.status(500).json({ success: false });
  }
};

exports.addComment = async (req, res) => {
  const { videoId, userId, comment } = req.body;
  try {
    const newComment = await Comment.create({
      videoId,
      userId,
      comment,
      upvotes: 0,
    });

    res
      .status(200)
      .json({ success: true, comment, videoId, userId, id: newComment._id });
  } catch (err) {
    console.log("Failed to add comment", err);
    res.status(500).json({ success: false });
  }
};

exports.addCommentUpvote = async (req, res) => {
  const { videoId, userId, commentId } = req.body;

  try {
    await CommentUpvote.create({
      videoId,
      userId,
      commentId,
    });

    await Comment.findOneAndUpdate(
      { _id: commentId },
      { $inc: { upvotes: 1 } }
    );

    res.status(200).json({ success: true, videoId, userId, commentId });
  } catch (err) {
    console.log("Failed to add upvote", err);
    res.status(500).json({ success: false });
  }
};
