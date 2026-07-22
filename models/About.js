const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    title: { type: String, default: "Blending creativity with" },
    titleHighlight: { type: String, default: "technical precision." },
    image: { type: String, default: "" },
    content: { type: String, default: "" },
    stats: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("About", aboutSchema);
