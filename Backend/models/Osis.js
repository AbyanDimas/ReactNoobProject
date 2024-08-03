const mongoose = require("mongoose");

const osisSchema = new mongoose.Schema({
  name: String,
  role: String,
  age: Number,
  imageUrl: String,
});

module.exports = mongoose.model("Osis", osisSchema);
