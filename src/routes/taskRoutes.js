const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  searchTasks,
} = require('../controllers/taskController');
const { getTasksByCategory } = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');

// Re-route into comment router
const commentRouter = require('./commentRoutes');
router.use('/:id/comments', commentRouter);

// Apply authentication middleware to all routes
router.use(protect);

// GET all tasks and POST new task
router.route('/').get(getTasks).post(createTask);

// GET tasks with search filters
router.route('/search').get(searchTasks);

// GET tasks by category
router.route('/category/:categoryId').get(getTasksByCategory);

// GET, PUT, DELETE task by ID
router.route('/:id').get(getTaskById).put(updateTask).delete(deleteTask);

module.exports = router; 