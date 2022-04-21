const asyncHandler = require("../middlewares/asyncHandlerFn");
const mongoose = require("mongoose");

const User = require("../models/User");

mongoose.connect(process.env.USER_DBHOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

// Update username
exports.changeUsername = asyncHandler(async (req, res) => {
  const { newUsername } = req.body
  try {
    await User.findOneAndUpdate({ id: req.decoded.id }, { username: newUsername })
    res.status(200).json({ success: true, message: "Successfully updated username" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to change username" });
  }
});


// Update email
exports.changeEmail = asyncHandler(async (req, res) => {
  const { newEmail } = req.body
  if (!req.decoded.userId) {
    res.status(404).json({ success: false, message: "Failed to change email" });
    return
  }


  try {
    await User.findOneAndUpdate({ id: req.decoded.userId }, { email: newEmail })
    res.status(200).json({ success: true, message: "Successfully updated email" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to change email" });
  }
});



