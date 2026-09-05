const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    // Raised from 10MB to 200MB — images are small, but video files need much more room
    fileSize: 200 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    const allowedMimes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "video/mp4",
      "video/webm",
      "video/ogg",
      "video/quicktime",
    ];
    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
      return;
    }
    callback(new Error("Only image, gif, and video uploads are allowed"));
  },
});

module.exports = upload;
