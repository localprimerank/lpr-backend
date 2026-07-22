const express = require('express');
const { protect, admin } = require('../middleware/auth');
const {
  getHero, updateHero
} = require('../controllers/heroController');

const router = express.Router();
router.get('/', getHero);
router.put('/', protect, admin, updateHero);
module.exports = router;