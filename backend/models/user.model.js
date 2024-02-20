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
    profilePicture: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw3-UUkMz-WOquWr0CnYFTJ8&ust=1708438436282000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCJju6KLLt4QDFQAAAAAdAAAAABAEhttps://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw3-UUkMz-WOquWr0CnYFTJ8&ust=1708438436282000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCJju6KLLt4QDFQAAAAAdAAAAABAE",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };
