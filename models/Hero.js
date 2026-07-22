const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema(
  {
    title: { type: String, default: "TURNING IDEAS INTO" },
    titleHighlight: { type: String, default: "MASTERPIECES" },
    description: { type: String, default: "We combine brand vision..." },
    username: { type: String, default: "LOCAL PRIME RANK" },
    storyTimeOffset: { type: String, default: "3h" },
    avatar: { type: String, default: "" },
    stories: [
      {
        url: { type: String, required: true },
        type: { type: String, enum: ["image", "video", "gif"], default: "image" },
        allowAudio: { type: Boolean, default: false },
      },
    ],
    videoMute: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hero", heroSchema);
