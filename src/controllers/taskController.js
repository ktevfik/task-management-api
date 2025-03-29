const Task = require('../models/taskModel');
const Category = require('../models/categoryModel');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    // Get only the tasks created by the logged-in user
    const tasks = await Task.find({ user: req.user.id }).populate('category', 'name color');
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('category', 'name color')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'name'
        },
        options: { sort: { createdAt: -1 } }
      });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    // Check if the task belongs to the user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to access this task' });
    }
    
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate, priority, category } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Please provide a title' });
    }
    
    // If category is provided, check if it exists and belongs to the user
    if (category) {
      const categoryExists = await Category.findOne({
        _id: category,
        user: req.user.id
      });
      
      if (!categoryExists) {
        return res.status(404).json({ message: 'Category not found or does not belong to you' });
      }
    }
    
    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
      priority,
      category,
      user: req.user.id,  // Add user ID from the authenticated user
    });
    
    // Populate the category in the response
    const populatedTask = await Task.findById(task._id).populate('category', 'name color');
    
    res.status(201).json(populatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    // Check if the task belongs to the user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this task' });
    }
    
    // If category is provided, check if it exists and belongs to the user
    if (req.body.category) {
      const categoryExists = await Category.findOne({
        _id: req.body.category,
        user: req.user.id
      });
      
      if (!categoryExists) {
        return res.status(404).json({ message: 'Category not found or does not belong to you' });
      }
    }
    
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('category', 'name color');
    
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    // Check if the task belongs to the user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this task' });
    }
    
    await Task.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search tasks with filters
// @route   GET /api/tasks/search
// @access  Private
const searchTasks = async (req, res) => {
  try {
    const { title, description, status, priority, startDate, endDate } = req.query;
    
    // Build query object - always filter by user
    const query = { user: req.user.id };
    
    // Add search filters if provided
    if (title) {
      query.title = { $regex: title, $options: 'i' }; // case-insensitive search
    }
    
    if (description) {
      query.description = { $regex: description, $options: 'i' };
    }
    
    if (status) {
      query.status = status;
    }
    
    if (priority) {
      query.priority = priority;
    }
    
    // Handle date range search
    if (startDate || endDate) {
      query.dueDate = {};
      
      if (startDate) {
        query.dueDate.$gte = new Date(startDate);
      }
      
      if (endDate) {
        query.dueDate.$lte = new Date(endDate);
      }
    }
    
    const tasks = await Task.find(query).populate('category', 'name color');
    
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  searchTasks,
}; 