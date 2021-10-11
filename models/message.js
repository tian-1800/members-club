var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// const { DateTime } = require("luxon");

const messageSchema = new Schema({
  title: { type: String },
  timeStamp: { type: Date, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

messageSchema.virtual("timeStampFormatted").get(function () {
  return this.timeStamp.toLocaleDateString();
});

module.exports = mongoose.model("Message", messageSchema);
