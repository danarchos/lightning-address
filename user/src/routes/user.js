const express = require("express");
const { protect } = require("../middlewares/protectedRoute");

const { user, changeUsername, changeEmail } = require("../controllers/user");
const { signup, login, initiateResetPassword, authenticateResetCode, resetNewPassword } = require("../controllers/auth");

const router = express.Router();

router.route("/user").get(protect, user);
router.route("/initiate-reset-password").post(initiateResetPassword);
router.route("/authenticate-reset-code").post(authenticateResetCode);
router.route("/change-username").post(protect, changeUsername);
router.route("/change-email").post(protect, changeEmail);
router.route("/reset-password").post(resetNewPassword);
router.route("/signup").post(signup);
router.route("/login").post(login);
// router.route("/verifyDecodeUser").get(veryifyDecodeUser);


module.exports = router;
