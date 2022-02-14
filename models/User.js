const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    photoURL: {
      type: String,
      default:
        "https://lh3.googleusercontent.com/a/AATXAJxbFNCYymcNxQou5CfRK8Yk6Y5R4QvvsXE7hPHH=s96-c",
    },
    phoneNumber: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
