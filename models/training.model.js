const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    mode: {
      type: String,
      required: true,
      enum: ["online", "offline"],
    },
    url: {
      type: String,
      required: function () {
        return this.mode === "online";
      },
    },
    location: {
      type: String,
      required: function () {
        return this.mode === "offline";
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Training", trainingSchema);

// models/Training.js
// const mongoose = require("mongoose");

// const trainingSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     date: { type: Date, required: true },
//     duration: { type: String, required: true },
//     price: { type: Number, required: true },
//     mode: { type: String, enum: ["online", "offline"], required: true },
//     url: { type: String },
//     location: { type: String },
//     isDeleted: { type: Boolean, default: false }, // Soft delete flag
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Training", trainingSchema);
