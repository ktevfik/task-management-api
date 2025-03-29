const express = require('express');
const router = express.Router();
const {
  getCategories,
  createCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');

// Apply authentication middleware to all routes
router.use(protect);

// GET all categories and POST new category
router.route('/').get(getCategories).post(createCategory);

// DELETE category by ID
router.route('/:id').delete(deleteCategory);

module.exports = router; 