const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  videoId: { type: String, required: true },
  userId: { type: String, required: true },
  comment: { type: String, required: true },
  upvotes: { type: Number, required: true },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
