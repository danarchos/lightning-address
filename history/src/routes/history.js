const express = require("express");
const { videoViewed } = require("../controllers/history");

const router = express.Router();

router.route("/").get(videoViewed);

module.exports = router;
