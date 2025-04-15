const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Generate token with user's id and role included in the payload
const generateToken = (user, expiresIn = config.JWT_EXPIRE) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role, 
    },
    config.JWT_SECRET,
    {
      expiresIn,
    }
  );
};

// Send token response with user details (including role) returned in the JSON response
const sendTokenResponse = (user, statusCode, res, options = {}) => {
  const token = generateToken(user, options.expiresIn);

  const cookieOptions = {
    expires: new Date(
      Date.now() +
        (options.expiresIn
          ? 30 * 24 * 60 * 60 * 1000
          : config.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  res
    .status(statusCode)
    .cookie('token', token, cookieOptions)
    .json({
      success: true,
      token,
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role, 
      },
    });
};

module.exports = {
  generateToken,
  sendTokenResponse,
};
