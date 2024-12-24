const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  searchBlog
} = require("../controllers/blog.controller");
const validateBlog = require('../middleware/authMiddleware')
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @route   POST /api/blog/create
 * @desc    Create a new blog post
 * @access  Private
 */
router.post("/create", protect, createBlog);

/**
 * @route GET /api/blog
 * @desc Get all blogs
 * @access Public
 */
router.get("/", getAllBlogs);

/**
 * @route GET /api/blog/:id
 * @desc Get a single blog by ID
 * @access Public
 */
router.get("/post/:id", getBlogById);

/**
 * @route Post /api/blog/:id
 * @desc Update a blog post
 * @access Private
 */
router.post("/update/:id", protect, updateBlog);

/**
 * @route Post /api/blog/search
 * @desc Search a blog post
 * @access Private
*/
router.post("/search",  searchBlog);

// /**
//  * @route Post /api/blog/:id
//  * @desc Delete a blog post
//  * @access Private
//  */
// router.post("/:id", protect, deleteBlog);

module.exports = router;
