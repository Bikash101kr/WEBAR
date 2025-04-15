const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const { generateToken, sendTokenResponse } = require('../utils/tokenHandler');
const validator = require('validator');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, agreedToPrivacyPolicy } = req.body;

    // Validate input
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return next(new ErrorResponse('All fields are required', 400));
    }

    if (!validator.isEmail(email)) {
      return next(new ErrorResponse('Please provide a valid email', 400));
    }

    if (password !== confirmPassword) {
      return next(new ErrorResponse('Passwords do not match', 400));
    }

    if (!agreedToPrivacyPolicy) {
      return next(new ErrorResponse('You must agree to the privacy policy', 400));
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorResponse('Email is already registered', 400));
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      agreedToPrivacyPolicy
    });

    // Send token response
    sendTokenResponse(user, 201, res);
  } catch (err) {
    // Handle duplicate key error (MongoDB E11000)
    if (err.code === 11000) {
      return next(new ErrorResponse('Email is already registered', 400));
    }
    next(err);
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password, rememberMe, role } = req.body;

    // Validate email & password
    if (!email || !password) {
      return next(new ErrorResponse('Please provide an email and password', 400));
    }

    if (!validator.isEmail(email)) {
      return next(new ErrorResponse('Please provide a valid email', 400));
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Set longer expiration if rememberMe is true
    const tokenOptions = {};
    if (rememberMe) {
      tokenOptions.expiresIn = '30d';
    }

    // Send token response
    sendTokenResponse(user, 200, res, tokenOptions);
  } catch (err) {
    next(err);
  }
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};