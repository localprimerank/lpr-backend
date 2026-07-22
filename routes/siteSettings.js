const express = require('express');
const { protect, admin } = require('../middleware/auth');
const { getSiteSettings, updateSiteSettings } = require('../controllers/siteSettingsController');

const router = express.Router();
router.get('/', getSiteSettings);
router.put('/', protect, admin, updateSiteSettings);
module.exports = router;
