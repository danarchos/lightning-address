const mongoose = require("mongoose");

mongoose.connect(process.env.HISTORY_DBHOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.videoViewed = async (req, res) => {
  const msg = "";
  const parsedMsg = JSON.parse(msg).content.toString();
  res.status(200).json({ success: true, message: "Hello World" });
};
