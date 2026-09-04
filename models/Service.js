const mongoose = require("mongoose");

const caseStudySchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    image: { type: String, trim: true, default: "" },
    video: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

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

    // main video
    video: { type: String, default: "" },

    // short description shown under the service title
    description: { type: String, trim: true, default: "" },

    // plain info block (no heading), shown right after the image/video
    aboutText: { type: String, trim: true, default: "" },

    // Case Studies section — one heading for the whole section,
    // and now a LIST of case studies instead of a single one
    caseStudyHeading: { type: String, trim: true, default: "CASE STUDIES" },
    caseStudies: [caseStudySchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Service", serviceSchema);
