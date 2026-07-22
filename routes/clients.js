const express = require('express');
const { protect, admin } = require('../middleware/auth');
const {
  getClients, getClient, createClient, updateClient, deleteClient
} = require('../controllers/clientController');

const router = express.Router();
router.get('/', getClients);
router.get('/:id', getClient);
router.post('/', protect, admin, createClient);
router.put('/:id', protect, admin, updateClient);
router.delete('/:id', protect, admin, deleteClient);
module.exports = router;