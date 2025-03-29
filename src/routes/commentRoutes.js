const express = require('express');
const router = express.Router({ mergeParams: true }); // Merges parameters from parent router
const {
  addComment,
  getTaskComments,
  updateComment,
  deleteComment,
} = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

// Apply authentication middleware to all routes
router.use(protect);

// GET all comments for a task and POST new comment
router.route('/').get(getTaskComments).post(addComment);

// Update and delete comment
router.route('/:commentId').put(updateComment).delete(deleteComment);

module.exports = router; 