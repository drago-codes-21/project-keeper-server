const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
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
  image: {
    type: String,
  },
  catagory: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
