const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 1,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      min: 1,
      unique: true,
    },
    password: {
      type: String,
      min: 1,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };
