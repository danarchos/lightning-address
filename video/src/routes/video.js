const express = require("express");
const { protect } = require("../middlewares/protectedRoute");

const { save, view, videosByUser, videoById } = require("../controllers/video");

const router = express.Router();

router.route("/videosByUser").get(protect, videosByUser);
router.route("/video").get(videoById);
router.route("/").post(protect, save);
router.route("/view").post(view);

module.exports = router;
