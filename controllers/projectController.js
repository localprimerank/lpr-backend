const Project = require('../models/Project');

// 1. Get all projects
const getProjects = async (req, res) => {
  try {
    const { published } = req.query;
    let filter = {};

    if (published === 'all') {
      filter = {};
    } else if (published === 'false') {
      filter = { published: false };
    } else {
      filter = { published: true };
    }

    const projects = await Project.find(filter).sort('-createdAt');
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// 2. Get single project
const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// 3. Create project
const createProject = async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// 4. Update project
const updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProject) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.json({ success: true, data: updatedProject });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// 5. Delete project
const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
};