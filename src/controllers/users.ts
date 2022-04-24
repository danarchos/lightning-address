import { asyncHandler } from "../middlewares/asyncHandlerFn";
import { User } from "../models/User";
import LNPayService from "../services/Pay";

// GET user
export const userInfo = asyncHandler(async (req: any, res: any) => {
  const { email } = req.query;

  let user;
  if (email) user = await User.findOne({ email });

  if (!user) {
    res.status(400).json({ success: false, message: "No email found" });
    return;
  }

  // Get Balance
  const wallet = await LNPayService.getWallet();
  res.status(200).json({ success: true, user, wallet });
});

// Update username
export const changeUsername = asyncHandler(async (req: any, res: any) => {
  const { username } = req.body;

  if (!process.env.JWT_SECRET) {
    res.status(500).json({ success: false, message: "Server Error" });
    return;
  }
  try {
    await User.findOneAndUpdate({ id: req.decoded.id }, { username });

    res.status(200).json({
      success: true,
      message: "Successfully updated username",
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to change username" });
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
