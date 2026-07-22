const Stat = require("../models/Stat");

const getStats = async (req, res) => {
  try {
    const stats = await Stat.find();
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getStat = async (req, res) => {
  try {
    const stat = await Stat.findById(req.params.id);
    if (!stat)
      return res.status(404).json({ success: false, error: "Stat not found" });
    res.json({ success: true, data: stat });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const createStat = async (req, res) => {
  try {
    const stat = await Stat.create(req.body);
    res.status(201).json({ success: true, data: stat });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const updateStat = async (req, res) => {
  try {
    const stat = await Stat.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!stat)
      return res.status(404).json({ success: false, error: "Stat not found" });
    res.json({ success: true, data: stat });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const deleteStat = async (req, res) => {
  try {
    const stat = await Stat.findByIdAndDelete(req.params.id);
    if (!stat)
      return res.status(404).json({ success: false, error: "Stat not found" });
    res.json({ success: true, message: "Stat deleted" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = { getStats, getStat, createStat, updateStat, deleteStat };
