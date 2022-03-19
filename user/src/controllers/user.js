const asyncHandler = require("../middlewares/asyncHandlerFn");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { installWallet } = require("../utils/wallets");

const User = require("../models/User");

mongoose.connect(process.env.USER_DBHOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Adds a user to USER DB
exports.addUser = asyncHandler(async (req, res) => {
  const newUser = new User(req.body);

  const result = await installWallet(req.body.username);
  newUser.wallet = result.data.wallet;

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);
  const user = await newUser.save();

  if (user) {
    res.status(200).json({ success: true, user });
    return;
  }
  res.status(500).json({ success: false });
});

// GET user
exports.user = asyncHandler(async (req, res) => {
  const { email } = req.query;

  let user;
  if (email) user = await User.findOne({ email });

  if (!user) {
    res.status(400).json({ success: false, message: "No email found" });
    return;
  }
  res.status(200).json({ success: true, user });
});
