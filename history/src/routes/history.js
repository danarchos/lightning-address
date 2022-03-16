const express = require("express");
const { videoViewed, addLike } = require("../controllers/history");

const router = express.Router();

router.route("/").get(videoViewed);
router.route("/like").post(addLike);

module.exports = router;
