const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    // ── EXISTING FIELDS (unchanged) ──
    title: { type: String, required: true },
    price: { type: String, required: true },
    features: [{ type: String }],
    image: { type: String },
    imageAlt: { type: String },
    buttonText: { type: String, default: "Get in touch" },
    order: { type: Number, default: 0 },

    // ── NEW: main video (your frontend already expects this field) ──
    video: { type: String, default: "" },

    // ── NEW: short description shown under the service title ──
    description: { type: String, trim: true, default: "" },

    // ── NEW: plain info block (no heading), shown right after the image/video ──
    aboutText: { type: String, trim: true, default: "" },

    // ── NEW: Case Studies section ──
    caseStudyHeading: { type: String, trim: true, default: "CASE STUDIES" },
    caseStudyDescription: { type: String, trim: true, default: "" },
    caseStudyImage: { type: String, trim: true, default: "" },
    caseStudyVideo: { type: String, trim: true, default: "" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Service", serviceSchema);
