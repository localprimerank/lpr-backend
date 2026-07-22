const About = require("../models/About");

const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.json({ success: true, data: about });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const createAbout = async (req, res) => {
  try {
    const existing = await About.findOne();
    if (existing) {
      return res.status(400).json({
        success: false,
        error: "About section already exists. Edit the existing entry instead.",
      });
    }

    const newAbout = await About.create(req.body);
    res.status(201).json({ success: true, data: newAbout });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const updateAbout = async (req, res) => {
  try {
    const updatedAbout = await About.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });
    res.json({ success: true, data: updatedAbout });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const deleteAbout = async (req, res) => {
  try {
    const deletedAbout = await About.findByIdAndDelete(req.params.id);
    if (!deletedAbout) {
      return res.status(404).json({ success: false, error: "About not found" });
    }
    res.json({ success: true, message: "About deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAbout,
  createAbout,
  updateAbout,
  deleteAbout,
};
