const Category = require('../models/categoryModel');
const Task = require('../models/taskModel');

// @desc    Get all categories for a user
// @route   GET /api/categories
// @access  Private
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private
const createCategory = async (req, res) => {
  try {
    const { name, color } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Please provide a category name' });
    }

    // Check if category with this name already exists for this user
    const existingCategory = await Category.findOne({ 
      name: name,
      user: req.user.id 
    });

    if (existingCategory) {
      return res.status(400).json({ message: 'A category with this name already exists' });
    }

    const category = await Category.create({
      name,
      color,
      user: req.user.id,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check if the category belongs to the user
    if (category.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this category' });
    }

    // Remove the category from all associated tasks
    await Task.updateMany(
      { category: req.params.id },
      { $unset: { category: "" } }
    );

    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Category removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get tasks by category
// @route   GET /api/tasks/category/:categoryId
// @access  Private
const getTasksByCategory = async (req, res) => {
  try {
    // Find the category first to ensure it belongs to the user
    const category = await Category.findById(req.params.categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check if the category belongs to the user
    if (category.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to access this category' });
    }

    const tasks = await Task.find({ 
      user: req.user.id,
      category: req.params.categoryId
    }).populate('category', 'name color');

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
  getTasksByCategory,
}; 