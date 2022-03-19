const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  username: { type: String, required: true },
  recieveKey: { type: String, required: true },
  userId: { type: String, required: true },
});

const Video = mongoose.model("Video", VideoSchema);

module.exports = Video;
