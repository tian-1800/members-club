var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const messageSchema = new Schema({
  title: { type: String },
  timeStamp: { type: Date, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Message", messageSchema);
