const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes (Checks if user is logged in)
const protect = async (req, res, next) => {
  let token;

  // 1. Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]; // Get token from "Bearer TOKEN"
  }

  // 2. If no token, return error
  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized, no token provided' });
  }

  try {
    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Find user by id and save to req.user (do not load password)
    req.user = await User.findById(decoded.id).select('-password');
    
    next(); // Move to the next function
  } catch (error) {
    res.status(401).json({ success: false, error: 'Not authorized, invalid token' });
  }
};

// Middleware to check if user is an Admin
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, error: 'Access denied: Admin rights required' });
  }
};

const optionalProtect = async (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    next();
  }
};

module.exports = {
  protect,
  admin,
  optionalProtect,
};