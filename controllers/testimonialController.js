const Testimonial = require('../models/Testimonial');

const getTestimonials = async (req, res) => {
  try {
    const items = await Testimonial.find();
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getTestimonial = async (req, res) => {
  try {
    const item = await Testimonial.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Testimonial not found' });
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const createTestimonial = async (req, res) => {
  try {
    const item = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const updateTestimonial = async (req, res) => {
  try {
    const item = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ success: false, error: 'Testimonial not found' });
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const item = await Testimonial.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Testimonial not found' });
    res.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
};