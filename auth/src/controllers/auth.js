const asyncHandler = require("../middlewares/asyncHandlerFn");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_EXPIRE = process.env.JWT_EXPIRE;
const JWT_SECRET = process.env.JWT_SECRET;

// SIGN UP - Creates user model, adds salt to password, creates a JWT
exports.signup = asyncHandler(async (req, res) => {
  const newUser = req.body;

  // const salt = await bcrypt.genSalt(10);
  // newUser.password = await bcrypt.hash(newUser.password, salt);

  // const payload = { id: user.id, username: user.username };
  // const token = jwt.sign(payload, JWT_SECRET, {
  //   expiresIn: JWT_EXPIRE,
  // });
  res.status(200).json({ success: true, newUser });
  // res.status(200).json({ success: true, data: token, newUser });
});

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // const user = await User.findOne({ email });

  // if (!user) {
  //   res.status(400).json({ success: false, message: "No email found" });
  // }

  // const passwordMatch = await bcrypt.compare(password, user.password);
  // if (!passwordMatch) {
  //   res.status(401).json({ success: false, message: "Incorrect Password" });
  // }

  // const payload = { id: user.id };
  // const token = jwt.sign(payload, JWT_SECRET, {
  //   expiresIn: JWT_EXPIRE,
  // });

  // res.status(200).json({ success: true, data: token });
};
