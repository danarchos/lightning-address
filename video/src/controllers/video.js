const asyncHandler = require("../middlewares/asyncHandlerFn");
const mongoose = require("mongoose");
const Video = require("../models/Video");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_EXPIRE = process.env.JWT_EXPIRE;
const JWT_SECRET = process.env.JWT_SECRET;

mongoose.connect(process.env.VIDEO_DBHOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Hello World
exports.helloWorld = async (req, res) => {
  res.status(200).json({ success: true, message: "worked" });
};
