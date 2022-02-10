const express = require("express");

const { addUser, user } = require("../controllers/user");

const router = express.Router();

router.route("/addUser").post(addUser);
router.route("/user").get(user);

module.exports = router;
