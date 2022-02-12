const express = require("express");
const { protect } = require("../middlewares/protectedRoute");

const { save, view } = require("../controllers/video");

const router = express.Router();

router.route("/").post(protect, save);
router.route("/view").post(view);

module.exports = router;
