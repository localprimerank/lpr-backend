const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String },
    avatar: { type: String },
    text: { type: String },
    stars: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
