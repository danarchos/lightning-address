const asyncHandler = require("../middlewares/asyncHandlerFn");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_EXPIRE = process.env.JWT_EXPIRE;
const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = asyncHandler(async (req, res, next) => {
  //   const user = await User.create(req.body);

  console.log(req.body);

  const salt = await bcrypt.genSalt(10);
  console.log({ salt });

  //   user.password = await bcrypt.hash(user.password, salt);
  //   await user.save();

  const payload = { id: "<userId>" };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });

  res.status(200).json({ success: true, data: token });
});
