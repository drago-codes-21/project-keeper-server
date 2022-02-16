const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      max: 20,
      min: 3,
    },
    description: {
      type: String,
      max: 50,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      default:
        "https://lh3.googleusercontent.com/a/AATXAJxbFNCYymcNxQou5CfRK8Yk6Y5R4QvvsXE7hPHH=s96-c",
    },
    catagory: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
