const Blog = require('../models/Blog');

// 1. Get all blogs (Public - with optional filter)
const getBlogs = async (req, res) => {
  try {
    const { published } = req.query;
    let filter = {};

    if (published === 'all') {
      filter = {};
    } else if (published === 'false') {
      filter = { published: false };
    } else {
      filter = { published: true }; // default show only published blogs
    }

    const blogs = await Blog.find(filter).sort('-date');
    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// 2. Get single blog by ID (Public)
const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog || (!blog.published && req.user?.role !== 'admin')) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }
    res.json({ success: true, data: blog });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }
    res.status(400).json({ success: false, error: error.message });
  }
};

// 3. Create a blog (Admin only)
const createBlog = async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.status(201).json({ success: true, data: newBlog });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// 4. Update a blog (Admin only)
const updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }
    res.json({ success: true, data: updatedBlog });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// 5. Delete a blog (Admin only)
const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }
    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Exporting with names matching the router exactly
module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog
};