const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema(
  {
    // Contact Info
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    address: { type: String, default: '' },

    // Social Links
    instagram: { type: String, default: '' },
    twitter: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    facebook: { type: String, default: '' },
    tiktok: { type: String, default: '' },
    pinterest: { type: String, default: '' },
    threads: { type: String, default: '' },
    youtube: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
