const Comment = require("../models/comment.model");
const mongoose = require("mongoose");
const Blog = require("../models/blog.model");
const axios = require("axios");

const createComment = async (req, res) => {
  try {
    const { content, postId, author, createdBy } = req?.body;
    if (!content || !postId) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = req?.user;
    const comment = await Comment.create({
      content,
      post: postId,
      author: user,
      createdBy: createdBy,
    });
    let blog = await Blog.findById(postId);
    await Blog.findByIdAndUpdate(postId, {
      comments: ++blog.comments,
    });

    res.status(201).json({ message: "Comment Created Successfully", comment });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res
      .status(200)
      .json({ message: "Comments Fetched Successfully", comments });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ post: postId });
    // Comment.find()
    if (comments.length === 0) {
      return res
        .status(404)
        .json({ message: "No comments found for this post" });
    }

    res.status(200).json({
      message: "Comments fetched successfully",
      comments,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { createComment, getAllComments, getComment };
