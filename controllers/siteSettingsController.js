const SiteSettings = require('../models/SiteSettings');

// GET /api/site-settings — public
const getSiteSettings = async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    // Auto-create empty doc if none exists
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// PUT /api/site-settings — admin only
const updateSiteSettings = async (req, res) => {
  try {
    const settings = await SiteSettings.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = { getSiteSettings, updateSiteSettings };
