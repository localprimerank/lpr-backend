const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    icon: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Skill", skillSchema);
