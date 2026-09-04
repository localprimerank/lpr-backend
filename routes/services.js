const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/auth");
const {
  getServices,
  getService,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

router.get("/", getServices);

// NEW: must come BEFORE "/:id" so "/slug/xyz" isn't swallowed by the :id route
router.get("/slug/:slug", getServiceBySlug);

router.get("/:id", getService);
router.post("/", protect, admin, createService);
router.put("/:id", protect, admin, updateService);
router.delete("/:id", protect, admin, deleteService);

module.exports = router;
