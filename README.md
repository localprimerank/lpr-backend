# LPR Agency Backend - API Guide

Node.js Express API with MongoDB Atlas for LPR Agency CMS.

## Setup

```bash
npm init -y
npm install express mongoose cors dotenv cloudinary multer jsonwebtoken bcryptjs morgan
npm install -D nodemon
```

## Project Structure

```
backend/
├── server.js              # Entry point
├── config/
│   ├── db.js             # MongoDB connection
│   └── cloudinary.js     # Cloudinary config
├── middleware/
│   ├── auth.js           # JWT authentication
│   ├── upload.js         # Multer + Cloudinary upload
│   └── errorHandler.js   # Global error handling
├── routes/
│   ├── auth.js           # /api/auth - Authentication
│   ├── services.js       # /api/services - Services CRUD
│   ├── blogs.js          # /api/blogs - Blogs CRUD
│   ├── projects.js       # /api/projects - Projects CRUD
│   ├── clients.js        # /api/clients - Clients CRUD
│   ├── skills.js         # /api/skills - Skills CRUD
│   ├── stats.js          # /api/stats - Stats
│   ├── testimonials.js   # /api/testimonials - Testimonials CRUD
│   ├── contact.js        # /api/contact - Contact submissions
│   └── hero.js           # /api/hero - Hero content
├── controllers/
│   ├── authController.js
│   ├── serviceController.js
│   ├── blogController.js
│   ├── projectController.js
│   ├── clientController.js
│   ├── skillController.js
│   ├── statController.js
│   ├── testimonialController.js
│   ├── contactController.js
│   └── heroController.js
└── .env
```

## .env Configuration

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/lpr-agency?retryWrites=true&w=majority
JWT_SECRET=your-jwt-secret-key-here
JWT_EXPIRE=7d
FRONTEND_URL=https://your-client-frontend.vercel.app
ADMIN_URL=https://your-admin.vercel.app
CORS_ORIGINS=https://extra-origin.example.com,https://another-origin.example.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Admin credentials (for initial setup)
ADMIN_EMAIL=admin@lpr.agency
ADMIN_PASSWORD=secure-password-here
```

## server.js

```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/clients', require('./routes/clients'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/hero', require('./routes/hero'));

// Error handler
app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

## MongoDB Models

### Service
```javascript
// models/Service.js
const serviceSchema = new mongoose.Schema({
  title: String,
  price: String,
  features: [String],
  image: String,
  imageAlt: String,
  buttonText: String,
  order: Number
}, { timestamps: true });
```

### Blog
```javascript
// models/Blog.js
const blogSchema = new mongoose.Schema({
  title: String,
  excerpt: String,
  content: String,
  category: String,
  image: String,
  date: Date,
  readTime: String,
  published: Boolean
}, { timestamps: true });
```

### Project
```javascript
// models/Project.js
const projectSchema = new mongoose.Schema({
  title: String,
  desc: String,
  type: String,
  tags: [String],
  img: String,
  accent: String,
  published: Boolean
}, { timestamps: true });
```

### Client
```javascript
// models/Client.js
const clientSchema = new mongoose.Schema({
  name: String,
  logo: String,
  website: String
}, { timestamps: true });
```

### Skill
```javascript
// models/Skill.js
const skillSchema = new mongoose.Schema({
  title: String,
  description: String,
  icon: String // SVG string or icon class
}, { timestamps: true });
```

### Stat
```javascript
// models/Stat.js
const statSchema = new mongoose.Schema({
  label: String,
  value: String,
  prefix: String,
  suffix: String
}, { timestamps: true });
```

### Testimonial
```javascript
// models/Testimonial.js
const testimonialSchema = new mongoose.Schema({
  name: String,
  role: String,
  avatar: String,
  text: String,
  stars: Number
}, { timestamps: true });
```

### Contact
```javascript
// models/Contact.js
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' }
}, { timestamps: true });
```

## CRUD Controllers Pattern

```javascript
// controllers/serviceController.js
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find().sort('order');
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
```

## Routes Pattern

```javascript
// routes/services.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getServices,
  getService,
  createService,
  updateService,
  deleteService
} = require('../controllers/serviceController');

// Public routes
router.get('/', getServices);
router.get('/:id', getService);

// Protected routes (admin only)
router.post('/', protect, createService);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);

module.exports = router;
```

## Authentication Middleware

```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
};
```

## Cloudinary Upload

```javascript
// middleware/upload.js
const multer = require('multer');
const cloudinary = require('../config/cloudinary');

const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.uploadToCloudinary = upload.single('image');

exports.handleCloudinaryUpload = async (req, res, next) => {
  if (!req.file) return next();
  
  try {
    const result = await cloudinary.uploader.upload_stream(
      { folder: 'lpr-agency' },
      (error, result) => {
        if (error) return res.status(400).json({ success: false, error: error.message });
        req.body.image = result.secure_url;
        next();
      }
    );
    result.end(req.file.buffer);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
```

## Deployment

- MongoDB Atlas: Create cluster, get connection string
- Cloudinary: Get cloud name, API key, API secret
- Deploy to: Vercel

## API Response Format

All responses follow:
```json
{
  "success": true,
  "data": [...],
  "message": "Optional message"
}
```
