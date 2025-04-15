require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Debugging - remove after confirmation
console.log('Environment Variables:', {
  MONGODB_URI: process.env.MONGODB_URI ? '*****' : 'MISSING',
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV
});

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// Routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/users', require('./routes/userRoutes'));

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3005;

// Only start server after MongoDB connection
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB Atlas');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Client URL: ${process.env.CLIENT_URL}`);
  });
});

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});