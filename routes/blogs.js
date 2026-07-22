const express = require("express");
const router = express.Router();

// Import middlewares
const { protect, admin, optionalProtect } = require("../middleware/auth");

// Import explicit controller operations
const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// Define specific paths
router.get("/", getBlogs);
router.get("/:id", optionalProtect, getBlog);
router.post("/", protect, admin, createBlog);
router.put("/:id", protect, admin, updateBlog);
router.delete("/:id", protect, admin, deleteBlog);

module.exports = router;
