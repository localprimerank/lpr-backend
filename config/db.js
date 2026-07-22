const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('Missing MONGODB_URI environment variable.');
    }
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected successfully to: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    if (process.env.VERCEL !== 'true') {
      process.exit(1);
    }
    throw error;
  }
};

module.exports = connectDB;
