const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper function to generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// 1. Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    
    // Check if user exists and password is correct
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    res.json({
      success: true,
      token: generateToken(user._id),
      user: { email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// 2. Register user
const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Secure: We explicitly create the user and force role to 'editor'
    // This stops public API requests from injecting a fake admin profile
    const newUser = await User.create({
      email,
      password,
      role: 'editor' 
    });

    res.status(201).json({
      success: true,
      token: generateToken(newUser._id)
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  login,
  register
};