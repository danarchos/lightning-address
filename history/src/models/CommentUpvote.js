const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentUpvoteSchema = new Schema({
  videoId: { type: String, required: true },
  commentId: { type: String, required: true },
  commenterUserId: { type: String, required: true },
  userId: { type: String, required: true },
});

const CommentUpvote = mongoose.model("CommentUpvote", CommentUpvoteSchema);

module.exports = CommentUpvote;
