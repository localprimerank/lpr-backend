const express = require("express");
const { protect, admin } = require("../middleware/auth");
const {
  getAbout,
  createAbout,
  updateAbout,
  deleteAbout,
} = require("../controllers/aboutController");

const router = express.Router();



router.get("/", getAbout);
router.post("/", protect, admin, createAbout);
router.put("/", protect, admin, updateAbout);
router.delete("/:id", protect, admin, deleteAbout);

module.exports = router;
