import express from "express";
import { protect } from "../middlewares/protectedRoute"

import { user, changeUsername, changeEmail } from "../controllers/users"
import { signup, login, initiateResetPassword, authenticateResetCode, resetNewPassword } from "../controllers/auth";

export const userRouter = express.Router();

userRouter.route("/user").get(protect, user);
userRouter.route("/initiate-reset-password").post(initiateResetPassword);
userRouter.route("/authenticate-reset-code").post(authenticateResetCode);
userRouter.route("/change-username").post(protect, changeUsername);
userRouter.route("/change-email").post(protect, changeEmail);
userRouter.route("/reset-password").post(resetNewPassword);
userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);
// router.route("/verifyDecodeUser").get(veryifyDecodeUser);


