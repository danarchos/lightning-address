const mongoose = require("mongoose");

mongoose.connect(process.env.HISTORY_DBHOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function consumeViewedMessage(msg) {
  // Handler for coming messages.
  console.log("Received a 'viewed' message");

  const parsedMsg = JSON.parse(msg.content.toString()); // Parse the JSON message.

  return videosCollection
    .insertOne({ videoPath: parsedMsg.videoPath }) // Record the "view" in the database.
    .then(() => {
      console.log("Acknowledging message was handled.");

      messageChannel.ack(msg); // If there is no error, acknowledge the message.
    });
}

exports.videoViewed = async (req, res) => {
  const msg = "";
  const parsedMsg = JSON.parse(msg).content.toString();
  res.status(200).json({ success: true, message: "Hello World" });
};
