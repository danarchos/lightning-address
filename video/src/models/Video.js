const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  title: String,
  url: String,
  dislikes: Number,
  likes: Number,
});

const Video = mongoose.model("Video", VideoSchema);

module.exports = Video;
