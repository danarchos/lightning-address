const asyncHandler = require("../middlewares/asyncHandlerFn");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_EXPIRE = process.env.JWT_EXPIRE;
const JWT_SECRET = process.env.JWT_SECRET;

// SIGN UP - Creates user model, adds salt to password, creates a JWT
exports.signup = asyncHandler(async (req, res) => {
  try {
    const {
      data: { success, user },
    } = await axios.post(`${process.env.USER_API_BASE}/api/addUser`, req.body);

    if (!success) {
      res
        .status(400)
        .json({ success: false, message: "Failed to save user in USER API" });
      return;
    }

    const payload = {
      userId: user._id,
      username: user.username,
      walletId: user.walletId,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });

    res.status(200).json({ success: true, token, expiresIn: JWT_EXPIRE });
  } catch (err) {
    console.log({ err });
  }
});

// LOGIN
exports.login = async (req, res) => {
  const { password, email } = req.body;
  try {
    const {
      data: { success, user },
    } = await axios.get(`${process.env.USER_API_BASE}/api/user?email=${email}`);

    if (!success) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ success: false, message: "Incorrect Password" });
      return;
    }

    const payload = {
      userId: user._id,
      username: user.username,
      walletId: user.walletId,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });

    res
      .status(200)
      .json({ success: true, token, message: "Successfully logged in" });
  } catch (err) {
    console.log("Error with auth -> /login endpoint");
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.veryifyDecodeUser = async (req, res) => {
  console.log("hey there", req.query.token);
  try {
    const decoded = await jwt.verify(req.query.token, process.env.JWT_SECRET);
    console.log({ decoded });
    res.status(200).json({
      success: true,
      message: "Verify decode loud and clear over",
      decoded,
    });
  } catch (err) {
    console.log({ err });
    res.status(403).json({
      success: true,
      message: "You cannot perform this upload.",
    });
  }
};
