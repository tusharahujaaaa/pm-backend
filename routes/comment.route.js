const express = require("express");
const {
  createComment,
  getAllComments,
  getComment,
} = require("../controllers/comment.cotroller");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create", protect, createComment);
router.get("/", getAllComments);
router.get('/:id', getComment)

module.exports = router;
