const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/whiteboardDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mongoose Schema for Sticky Notes
const stickySchema = new mongoose.Schema({
  content: String,
  posX: Number,
  posY: Number,
  width: Number,
  height: Number,
});

const Sticky = mongoose.model("Sticky", stickySchema);

// Middleware
app.use(bodyParser.json());

// API Endpoints
// GET all stickies
app.get("/api/stickies", async (req, res) => {
  try {
    const stickies = await Sticky.find();
    res.json({
      data: stickies,
      message: "successfully retrieved stickies!",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new sticky
app.post("/api/stickies", async (req, res) => {
  try {
    const { content, posX, posY, width, height } = req.body;
    const newSticky = new Sticky({ content, posX, posY, width, height });
    await newSticky.save();
    res.status(201).json({
      data: newSticky,
      message: "created successfully!",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update a sticky by ID
app.put("/api/stickies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { content, posX, posY } = req.body;
    const updatedSticky = await Sticky.findByIdAndUpdate(
      id,
      { content, posX, posY },
      { new: true }
    );
    res.json(updatedSticky);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a sticky by ID
app.delete("/api/stickies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Sticky.findByIdAndDelete(id);
    res.json({ message: "Sticky note deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
