const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  lightningAddress: { type: String, required: true },
});

const Video = mongoose.model("Video", VideoSchema);

module.exports = Video;
