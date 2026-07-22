const express = require('express');
const { protect, admin } = require('../middleware/auth');
const {
  getStats, getStat, createStat, updateStat, deleteStat
} = require('../controllers/statController');

const router = express.Router();
router.get('/', getStats);
router.get('/:id', getStat);
router.post('/', protect, admin, createStat);
router.put('/:id', protect, admin, updateStat);
router.delete('/:id', protect, admin, deleteStat);
module.exports = router;