const Training = require("../models/training.model");

// Create a new training session
const createTraining = async (req, res) => {
  const { title, description, date, duration, price, mode, url, location } =
    req.body;

  // Basic validation
  if (!title || !description || !date || !duration || !mode) {
    return res.status(400).json({
      message:
        "All required fields (title, description, date, duration, mode) must be provided",
    });
  }

  // Validate mode-specific fields
  if (mode === "online" && !url) {
    return res.status(400).json({ message: "URL is required for online mode" });
  }

  if (mode === "offline" && !location) {
    return res
      .status(400)
      .json({ message: "Location is required for offline mode" });
  }

  try {
    const training = await Training.create({
      title,
      description,
      date,
      duration,
      price,
      mode,
      url: mode === "online" ? url : null, // Only save URL for online mode
      location: mode === "offline" ? location : null, // Only save location for offline mode
      createdBy: req.user.id,
    });

    res.status(201).json(training);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch all training sessions
const getAllTrainings = async (req, res) => {
  try {
    // const trainings = await Training.find().populate("createdBy", "name email");
    const trainings = await Training.find({ isDeleted: false });
    res.status(200).json(trainings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch a single training session by ID
const getTrainingById = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );
    if (!training) {
      return res.status(404).json({ message: "Training not found" });
    }
    res.status(200).json(training);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a training session
const updateTraining = async (req, res) => {
  const { title, description, date, duration, price, mode, url, location } =
    req.body;

  // Validate mode-specific fields
  if (mode === "online" && !url) {
    return res.status(400).json({ message: "URL is required for online mode" });
  }
  if (mode === "offline" && !location) {
    return res
      .status(400)
      .json({ message: "Location is required for offline mode" });
  }

  try {
    const training = await Training.findById(req.params.id);
    if (!training) {
      return res.status(404).json({ message: "Training not found" });
    }

    // Update fields
    training.title = title || training.title;
    training.description = description || training.description;
    training.date = date || training.date;
    training.duration = duration || training.duration;
    training.price = price || training.price;
    training.mode = mode || training.mode;
    training.url = mode === "online" ? url : null;
    training.location = mode === "offline" ? location : null;

    const updatedTraining = await training.save();
    res.status(200).json(updatedTraining);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a training session
const deleteTraining = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) {
      return res.status(404).json({ message: "Training not found" });
    }

    // await Training.findByIdAndDelete(req.params.id)
    training.isDeleted = true;
    await training.save();
      res.status(200).json({ message: "Training deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createTraining,
  getAllTrainings,
  getTrainingById,
  updateTraining,
  deleteTraining,
};
