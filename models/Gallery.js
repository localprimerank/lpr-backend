const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, default: "Gallery" },
    items: [
      {
        url: { type: String, required: true },
        type: { type: String, enum: ["image", "video", "gif"], default: "image" },
        caption: { type: String, default: "" },
      },
    ],
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);
