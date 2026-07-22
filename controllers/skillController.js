const Skill = require("../models/Skill");

const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json({ success: true, data: skills });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill)
      return res.status(404).json({ success: false, error: "Skill not found" });
    res.json({ success: true, data: skill });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!skill)
      return res.status(404).json({ success: false, error: "Skill not found" });
    res.json({ success: true, data: skill });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill)
      return res.status(404).json({ success: false, error: "Skill not found" });
    res.json({ success: true, message: "Skill deleted" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = { getSkills, getSkill, createSkill, updateSkill, deleteSkill };
