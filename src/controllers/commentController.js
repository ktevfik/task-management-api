const Comment = require('../models/commentModel');
const Task = require('../models/taskModel');

// @desc    Add comment to task
// @route   POST /api/tasks/:id/comments
// @access  Private
const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const taskId = req.params.id;

    // Check if text is provided
    if (!text) {
      return res.status(400).json({ message: 'Please provide comment text' });
    }

    // Check if task exists and belongs to user
    const task = await Task.findById(taskId);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to access this task' });
    }

    // Create comment
    const comment = await Comment.create({
      text,
      user: req.user.id,
      task: taskId,
    });

    // Add comment to task
    task.comments.push(comment._id);
    await task.save();

    // Return populated comment
    const populatedComment = await Comment.findById(comment._id).populate('user', 'name');
    
    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all comments for a task
// @route   GET /api/tasks/:id/comments
// @access  Private
const getTaskComments = async (req, res) => {
  try {
    const taskId = req.params.id;

    // Check if task exists and belongs to user
    const task = await Task.findById(taskId);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to access this task' });
    }

    // Get comments
    const comments = await Comment.find({ task: taskId })
      .populate('user', 'name')
      .sort({ createdAt: -1 }); // Newest first
    
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a comment
// @route   PUT /api/tasks/:id/comments/:commentId
// @access  Private
const updateComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: taskId, commentId } = req.params;

    // Check if text is provided
    if (!text) {
      return res.status(400).json({ message: 'Please provide comment text' });
    }

    // Check if task exists
    const task = await Task.findById(taskId);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if comment exists
    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    // Check if comment belongs to user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this comment' });
    }
    
    // Check if comment belongs to the task
    if (comment.task.toString() !== taskId) {
      return res.status(400).json({ message: 'Comment does not belong to this task' });
    }

    // Update comment
    comment.text = text;
    await comment.save();
    
    // Return updated comment
    const updatedComment = await Comment.findById(commentId).populate('user', 'name');
    
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a comment
// @route   DELETE /api/tasks/:id/comments/:commentId
// @access  Private
const deleteComment = async (req, res) => {
  try {
    const { id: taskId, commentId } = req.params;

    // Check if task exists
    const task = await Task.findById(taskId);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if comment exists
    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    // Check if comment belongs to user or if user owns the task
    const isCommentOwner = comment.user.toString() === req.user.id;
    const isTaskOwner = task.user.toString() === req.user.id;
    
    if (!isCommentOwner && !isTaskOwner) {
      return res.status(401).json({ message: 'Not authorized to delete this comment' });
    }
    
    // Check if comment belongs to the task
    if (comment.task.toString() !== taskId) {
      return res.status(400).json({ message: 'Comment does not belong to this task' });
    }

    // Remove comment from task
    task.comments = task.comments.filter(
      (comment) => comment.toString() !== commentId
    );
    await task.save();

    // Delete comment
    await Comment.findByIdAndDelete(commentId);
    
    res.status(200).json({ message: 'Comment removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addComment,
  getTaskComments,
  updateComment,
  deleteComment,
}; 