const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middleware/auth");
const {
  getGallery,
  getAllGalleries,
  createGallery,
  updateGallery,
  deleteGallery,
} = require("../controllers/galleryController");

router.get("/", getGallery);
router.get("/all", protect, admin, getAllGalleries);
router.post("/", protect, admin, createGallery);
router.put("/:id", protect, admin, updateGallery);
router.delete("/:id", protect, admin, deleteGallery);

module.exports = router;
