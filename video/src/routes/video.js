const express = require("express");

const { save } = require("../controllers/video");

const router = express.Router();

router.route("/").post(save);

module.exports = router;
