const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String },
    type: { type: String },
    tags: [{ type: String }],
    img: { type: String },
    accent: { type: String },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", projectSchema);
