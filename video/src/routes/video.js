const express = require("express");
const { protect } = require("../middlewares/protectedRoute");

const {
  save,
  view,
  videosByUser,
  videoById,
  like,
  dislike,
  comment,
} = require("../controllers/video");

const router = express.Router();

router.route("/videosByUser").get(videosByUser);
router.route("/video").get(videoById);
router.route("/").post(protect, save);
router.route("/view").post(view);
router.route("/like").post(protect, like);
router.route("/dislike").post(protect, dislike);
router.route("/comment").post(protect, comment);

module.exports = router;
