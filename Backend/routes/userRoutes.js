const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// Routes for user management
router.route('/')
  .get(protect, getUsers); // Get all users (protected)

router.route('/:id')
  .get(protect, getUser)       // Get single user (protected)
  .put(protect, updateUser)    // Update user (protected)
  .delete(protect, deleteUser); // Delete user (protected)

module.exports = router;