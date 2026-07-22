const Gallery = require('../models/Gallery');

const getGallery = async (req, res) => {
  try {
    let gallery = await Gallery.findOne({ visible: true });
    if (!gallery) {
      gallery = await Gallery.create({ visible: true });
    }
    res.json({ success: true, data: gallery });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getAllGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({ createdAt: -1 });
    res.json({ success: true, data: galleries });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const createGallery = async (req, res) => {
  try {
    console.log("Creating gallery with body:", JSON.stringify(req.body));
    const gallery = await Gallery.create(req.body);
    res.status(201).json({ success: true, data: gallery });
  } catch (error) {
    console.error("Gallery creation error:", error);
    res.status(400).json({ success: false, error: error.message });
  }
};

const updateGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!gallery) {
      return res.status(404).json({ success: false, error: 'Gallery not found' });
    }
    res.json({ success: true, data: gallery });
  } catch (error) {
    console.error("Gallery update error:", error);
    res.status(400).json({ success: false, error: error.message });
  }
};

const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);
    if (!gallery) {
      return res.status(404).json({ success: false, error: 'Gallery not found' });
    }
    res.json({ success: true, message: 'Gallery deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  getGallery,
  getAllGalleries,
  createGallery,
  updateGallery,
  deleteGallery
};
