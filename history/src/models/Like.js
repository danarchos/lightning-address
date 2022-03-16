const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  videoId: String,
  userId: String,
  like: Boolean,
});

const Like = mongoose.model("Like", LikeSchema);

module.exports = Like;
