const express = require("express");
const {
  createTraining,
  getAllTrainings,
  getTrainingById,
  updateTraining,
  deleteTraining,
} = require("../controllers/training.controller");
const validateRequestBody = require("../middleware/validatetraining");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @route   POST /api/training/create
 * @desc    Create a new training session
 * @access  Private
 */
router.post("/create", protect, validateRequestBody, createTraining);

/**
 * @route   GET /api/training
 * @desc    Get all training sessions
 * @access  Public
 */
router.get("/", getAllTrainings);

/**
 * @route   GET /api/training/:id
 * @desc    Get a specific training session by ID
 * @access  Public
 */
router.get("/:id", getTrainingById);

/**
 * @route   PUT /api/training/:id
 * @desc    Update a training session by ID
 * @access  Private
 */
router.put("/:id", protect, validateRequestBody, updateTraining);

/**
 * @route   DELETE /api/training/:id
 * @desc    Delete a training session by ID
 * @access  Private
 */
router.delete("/:id", protect, deleteTraining);

module.exports = router;
