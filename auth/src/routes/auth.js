const express = require("express");

const { signup, login, veryifyDecodeUser } = require("../controllers/auth");

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/verifyDecodeUser").get(veryifyDecodeUser);

module.exports = router;
