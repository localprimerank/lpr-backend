const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    excerpt: { type: String },
    content: { type: String },
    category: { type: String },
    image: { type: String },
    date: { type: Date },
    readTime: { type: String },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Blog", blogSchema);
