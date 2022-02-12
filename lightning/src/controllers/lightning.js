const mongoose = require("mongoose");

mongoose.connect(process.env.LIGHTNING_DBHOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.helloWorld = async (req, res) => {};
