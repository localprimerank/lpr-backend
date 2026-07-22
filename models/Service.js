const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: String, required: true },
    features: [{ type: String }],
    image: { type: String },
    imageAlt: { type: String },
    buttonText: { type: String, default: "Get in touch" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Service", serviceSchema);
