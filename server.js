require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorHandler");
const User = require("./models/User");

const app = express();
const isVercel = process.env.VERCEL === "true";

// 1. Connect to MongoDB Database
connectDB()
  .then(async () => {
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) return;

    const adminUser = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (adminUser) {
      adminUser.password = process.env.ADMIN_PASSWORD;
      adminUser.role = "admin";
      await adminUser.save();
      return;
    }

    await User.create({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: "admin",
    });
  })
  .catch((error) => {
    console.error(`Startup error: ${error.message}`);
  });

// server.js
app.use(
  cors({
    origin: true, // This dynamically echoes back whatever origin is requesting, acting like a "*" while supporting credentials
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Only log HTTP requests in terminal if not running on Vercel environment
if (!isVercel) {
  app.use(morgan("dev"));
}

// 3. Application API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/services", require("./routes/services"));
app.use("/api/blogs", require("./routes/blogs"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/clients", require("./routes/clients"));
app.use("/api/skills", require("./routes/skills"));
app.use("/api/stats", require("./routes/stats"));
app.use("/api/testimonials", require("./routes/testimonials"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/hero", require("./routes/hero"));
app.use("/api/site-settings", require("./routes/siteSettings"));
app.use("/api/about", require("./routes/about"));
app.use("/api/upload", require("./routes/upload"));
app.use("/api/gallery", require("./routes/gallery"));
app.use("/api/faq", require("./routes/faq"));

// Basic Server Health Route
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "API is working beautifully" });
});

// 4. Centralized Error Handling Middleware (Must be registered last)
app.use(errorHandler);

// 5. Port Listening Configuration
const PORT = process.env.PORT || 5000;
if (!isVercel) {
  app.listen(PORT, () => {
    console.log(`Backend server running on port: ${PORT}`);
  });
}

module.exports = app;
