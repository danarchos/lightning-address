const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ViewedVideoSchema = new Schema({
  videoId: String,
  userId: String,
});

const ViewedVideo = mongoose.model("ViewedVideo", ViewedVideoSchema);

module.exports = ViewedVideo;
