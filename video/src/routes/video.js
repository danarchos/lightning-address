const express = require("express");

const { save, view } = require("../controllers/video");

const router = express.Router();

router.route("/").post(save);
router.route("/view").post(view);

module.exports = router;
