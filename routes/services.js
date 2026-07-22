const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middleware/auth");
const {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

router.get("/", getServices);
router.get("/:id", getService);
router.post("/", protect, admin, createService);
router.put("/:id", protect, admin, updateService);
router.delete("/:id", protect, admin, deleteService);

module.exports = router;
