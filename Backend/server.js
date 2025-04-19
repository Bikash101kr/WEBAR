require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Initialize Express app
const app = express();
// 1. Database Connection
connectDB();

// Security Middlewares
app.use(helmet()); // Set security HTTP headers
app.use(hpp()); // Prevent parameter pollution

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});
app.use('/api', limiter);

//Body Parsing and Cookies
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Enable CORS middleware
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      process.env.CLIENT_URL,
      'http://localhost:3002',
      'http://127.0.0.1:3002',
      'http://localhost:3005',
      'http://127.0.0.1:3005'
      
    ];
    
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept'
  ],
  exposedHeaders: ['Authorization']
};

app.use(cors(corsOptions));


//  Route Handlers
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/users', require('./routes/userRoutes'));

// Production Static Assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

// Error Handling (must be last middleware)
app.use(errorHandler);

// Server Startup
const PORT = process.env.PORT || 3005;
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`CORS configured for: ${corsOptions.origin}`);
});

// MongoDB Connection Events
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  server.close(() => process.exit(1));
});

//  Process Termination Handlers
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

//Environment Debugging (Development Only)
if (process.env.NODE_ENV === 'development') {
  console.log('Environment Variables:', {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    CLIENT_URL: process.env.CLIENT_URL,
    MONGODB_URI: process.env.MONGODB_URI ? '*****' : 'MISSING',
    JWT_SECRET: process.env.JWT_SECRET ? '*****' : 'MISSING'
  });
}