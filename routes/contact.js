const express = require('express');
const { protect, admin } = require('../middleware/auth');
const {
  getContacts, getContact, createContact, updateContact, deleteContact
} = require('../controllers/contactController');

const router = express.Router();
router.get('/', protect, admin, getContacts);
router.get('/:id', protect, admin, getContact);
router.post('/', createContact);
router.put('/:id', protect, admin, updateContact);
router.delete('/:id', protect, admin, deleteContact);
module.exports = router;