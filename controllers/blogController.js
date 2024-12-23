const Blog = require("../models/Blog");
const mongoose = require("mongoose");

// Create a new blog post
const createBlog = async (req, res) => {
  const { title, content, tags, images, publishedDate } = req.body;
  if (!title || !content || !tags || !images) {
    return res.status(400).json({
      message:
        "All fields (title, content, tags, images, publishedDate) are required",
    });
  }

  const user = req.user;
  try {
    const blog = await Blog.create({
      title,
      content,
      tags,
      images,
      publishedDate,
      author: user._id,
      createdBy: user?._id,
      updatedBy: user?._id,
    });
    res.status(201).json({ message: "Blog Created Successfully", blog });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get all published blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true, isDeleted: false });

    res.status(200).json({ message: "Blogs Fetched Successfully", blogs });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a single blog by ID
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    // Add validation to check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID format",
      });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving blog",
      error: error.message,
    });
  }
};

// Update a blog post
const updateBlog = async (req, res) => {
  const id = req?.params?.id;
  const { title, content, tags, images, publishedDate, createdBy } = req?.body;
  const user = req?.user;
  if (user?._id != createdBy) {
    return res.status(401).json({message: "You are not authorized to update this blog"});
  }
  if (req?.body?.delete) {
    try {
      const blog = await Blog?.findByIdAndUpdate(id, {
        isPublished: false,
        isDeleted: true,
        updatedBy: user?._id,
      });
      res.status(200).json({ message: "Blog Deleted Successfully", blog });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  } else {
    try {
      const blog = await Blog?.findByIdAndUpdate(id, {
        title,
        content,
        tags,
        images,
        publishedDate,
        createdBy,
        updatedBy: user?._id,
      });
      res.status(200).json({ message: "Blog Updated Successfully", blog });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }
};

// Delete a blog post
// const deleteBlog = async (req, res) => {
//     const id = req?.parms?.id
//     try {
//         blog = await Blog.findByIdAndUpdate(id, { isPublished: false });
//         res.status(200).json({message: "Blog Deleted Successfully", blog});
//     } catch (error) {
//         res.status(500).json({message: "Server Error", error: error.message});
//     }
// }

// Search Blog
const searchBlog = async (req, res) => {
  try {
    const search = req?.body;
    const blogs = await Blog.find({
      title: { $regex: search?.title, $options: "i" },
    });
    res.status(200).json({ message: "Blogs Fetched Successfully", blogs });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  searchBlog,
  //   deleteBlog,
};
