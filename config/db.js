const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('Missing MONGODB_URI environment variable.');
    }

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      maxPoolSize: 10,
      minPoolSize: 1,
    });

    console.log(`MongoDB Connected successfully to: ${conn.connection.host}`);

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected!');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err.message);
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected!');
    });
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    if (process.env.VERCEL !== 'true') {
      process.exit(1);
    }
    throw error;
  }
};

module.exports = connectDB;
