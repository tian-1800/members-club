const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
  password: {
    type: String,
    min: [6, "Must be at least six characters"],
    required: true,
  },
  membership: {
    type: String,
    enum: ["user", "member"],
    required: true,
  },
});

UserSchema.virtual("name").get(function () {
  return this.firstname + " " + this.lastname;
});

module.exports = mongoose.model("User", UserSchema);
