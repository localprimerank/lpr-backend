const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middleware/auth");
const {
  getFAQs,
  getAllFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
} = require("../controllers/faqController");

router.get("/", getFAQs);
router.get("/all", protect, admin, getAllFAQs);
router.post("/", protect, admin, createFAQ);
router.put("/:id", protect, admin, updateFAQ);
router.delete("/:id", protect, admin, deleteFAQ);

module.exports = router;
