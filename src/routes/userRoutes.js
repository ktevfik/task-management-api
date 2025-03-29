const express = require('express');
const router = express.Router();
const { registerUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Register user
router.post('/', registerUser);

// Get user profile
router.get('/me', protect, getUserProfile);

module.exports = router; 