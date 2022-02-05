const express = require("express");

const { helloWorld } = require("../controllers/video");

const router = express.Router();

router.route("/").get(helloWorld);

module.exports = router;
