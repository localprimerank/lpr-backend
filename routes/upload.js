const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middleware/auth");
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

function uploadToCloudinary(file) {
  return new Promise((resolve, reject) => {
    const options = {
      folder: "lpr-agency",
      resource_type: "auto",
      timeout: 30000,
    };
    if (file.mimetype.startsWith("image/")) {
      options.transformation = [{ width: 1200, height: 800, crop: "limit" }];
    }
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
    stream.end(file.buffer);
  });
}

router.post("/", protect, admin, upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, error: "No file attachment detected" });
  }

  try {
    const result = await uploadToCloudinary(req.file);
    res.json({ success: true, url: result.secure_url });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(400).json({ success: false, error: error.message || "Upload failed" });
  }
});

module.exports = router;
