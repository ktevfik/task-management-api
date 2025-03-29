const express = require('express');
const router = express.Router();
const { 
  loginUser, 
  forgotPassword, 
  resetPassword 
} = require('../controllers/authController');

// Login user
router.post('/login', loginUser);

// Forgot password
router.post('/forgotpassword', forgotPassword);

// Reset password
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router; 