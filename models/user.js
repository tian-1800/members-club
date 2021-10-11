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
    type: Boolean,
    required: true,
  },
  admin: {
    type: Boolean,
  },
});

UserSchema.virtual("name").get(function () {
  return this.firstname + " " + this.lastname;
});

UserSchema.virtual("membershipStatus").get(function () {
  return this.admin
    ? "an Admin"
    : this.membership
    ? "a Full Member"
    : "a Non-Member User";
});

UserSchema.virtual("privileges").get(function () {
  const privileges = [
    "Delete message",
    "See author of each message",
    "Create New Message",
  ];
  return this.admin
    ? privileges
    : this.membership
    ? privileges.slice(1)
    : privileges.slice(2);
});

module.exports = mongoose.model("User", UserSchema);
