const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const config = require('../config/config');

// Protect routes - verify JWT token
exports.protect = async (req, res, next) => {
  let token;

  // Check for token in cookies
  if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.JWT_SECRET);
    
    // Check if user still exists
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return next(new ErrorResponse('The user belonging to this token no longer exists', 401));
    }

    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // Check if user's role is included in the allowed roles
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`, 
          403
        )
      );
    }
    next();
  };
};