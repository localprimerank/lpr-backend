const mongoose = require("mongoose");

const statSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
    prefix: { type: String, default: "" },
    suffix: { type: String, default: "" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Stat", statSchema);
