import { asyncHandler } from "../middlewares/asyncHandlerFn";
import { User } from "../models/User";

// GET user
export const userInfo = asyncHandler(async (req: any, res: any) => {
  const { id } = req.query;
  if (!id) {
    res.status(404).json({ success: false, message: "No User id Provided" });
  }
  let user;
  user = await User.findOne({ id });

  if (!user) {
    res.status(400).json({ success: false, message: "No user found" });
    return;
  }

  res.status(200).json({
    success: true,
    user: { email: user.email, username: user.username, id: user.id },
  });
});

export const checkUsername = asyncHandler(async (req: any, res: any) => {
  const { username } = req.query;

  const foundUser = await User.findOne({ username });

  if (foundUser) {
    res.status(200).json({ taken: true });
    return;
  }
  res.status(200).json({ taken: false });
});

// Update username
export const changeUsername = asyncHandler(async (req: any, res: any) => {
  const { username } = req.body;

  if (!process.env.JWT_SECRET) {
    res.status(500).send("Internal server error!");
    return;
  }
  try {
    await User.findOneAndUpdate({ id: req.decoded.id }, { username });

    res.status(200).json({
      success: true,
      message: "Successfully updated username",
    });
  } catch (err) {
    res.status(500).send("Internal server error!");
  }
});

// Update email
export const changeEmail = asyncHandler(async (req: any, res: any) => {
  const { email } = req.body;

  if (!process.env.JWT_SECRET) {
    res.status(500).json({ success: false, message: "Server Error" });
    return;
  }

  if (!req.decoded.userId) {
    res.status(404).json({
      success: false,
      message: "Failed to change email",
    });
    return;
  }

  try {
    await User.findOneAndUpdate({ id: req.decoded.userId }, { email });

    res.status(200).json({
      success: true,
      message: "Successfully updated email",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to change email" });
  }
});
