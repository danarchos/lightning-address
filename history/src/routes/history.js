const express = require("express");
const {
  videoViewed,
  addLike,
  getStats,
  addComment,
  addCommentUpvote,
} = require("../controllers/history");

const { protect } = require("../middlewares/protectedRoute");

const router = express.Router();

router.route("/").get(videoViewed);
router.route("/stats").get(getStats);
router.route("/like").post(protect, addLike);
router.route("/comment").post(addComment);
router.route("/comment-upvote").post(addCommentUpvote);

module.exports = router;
