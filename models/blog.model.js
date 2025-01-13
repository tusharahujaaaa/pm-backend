const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [String],
    images: [String], // Store image URLs
    publishDate: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    createdBy: {
      type: mongoose?.Schema?.Types?.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose?.Schema?.Types?.ObjectId,
      ref: "User",
      required: true,
    },
    search: { type: String, required: false },
    comments: { type: Number, default: 0 }, // Ensure this field exists
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
