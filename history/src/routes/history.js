const express = require("express");
const { videoViewed, addLike, likeInfo } = require("../controllers/history");

const router = express.Router();

router.route("/").get(videoViewed);
router.route("/like-info").get(likeInfo);
router.route("/like").post(addLike);

module.exports = router;
