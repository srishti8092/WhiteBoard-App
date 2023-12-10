const mongoose = require("mongoose");

const stickySchema = new mongoose.Schema({
  content: String,
  posX: Number,
  posY: Number,
  width: Number,
  height: Number,
});

const Sticky = mongoose.model("Sticky", stickySchema);

module.exports = Sticky;
