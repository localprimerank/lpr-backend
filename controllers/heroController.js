const Hero = require('../models/Hero');

// 1. Get hero content (Finds the first document in the collection)
const getHero = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    res.json({ success: true, data: hero });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// 2. Update hero content (Creates it if it doesn't exist yet using 'upsert')
const updateHero = async (req, res) => {
  try {
    const updatedHero = await Hero.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true // handles initial setup automatically if database is empty
    });
    res.json({ success: true, data: updatedHero });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  getHero,
  updateHero
};