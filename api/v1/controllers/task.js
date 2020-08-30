// Validation.
const { validationResult } = require('express-validator');

// Link Task model.
const Task = require('../../../models/Task');

module.exports = {
  create: async (req, res, _next) => {
    // Check for errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring data from request body.
    const { id, name, stage, deadline, link, note } = req.body;

    try {
      let task;
      if (id) {
        task = await Task.findOneAndUpdate(
          {
            _id: id,
          },
          {
            name,
            stage,
            deadline,
            link,
            note,
          },
          {
            new: true,
          }
        );

        if (!task) {
          return res.status(404).json({
            errors: [{ msg: 'Task not found!' }],
          });
        }
      } else {
        // Create new task, link author and save.
        task = new Task({ name, stage, deadline, link, note });
        task.author = req.user.id;
        await task.save();
      }
      return res.status(200).json(task);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        errors: [
          { msg: 'Unexpected server error happened. Please try again later!' },
        ],
      });
    }
  },

  getUserDefaultTasks: async (req, res, _next) => {
    try {
      // Get default tasks of current authenticated user.
      const tasks = await Task.find({
        author: req.user.id,
        is_default: true,
      });

      // Check and return tasks array if exists.
      if (!tasks) {
        return res.status(404).json({
          errors: [{ msg: 'Tasks not found!' }],
        });
      }
      return res.status(200).json(tasks);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        errors: [
          { msg: 'Unexpected server error happened. Please try again later!' },
        ],
      });
    }
  },

  deleteTask: async (req, res, _next) => {
    try {
      const task = await Task.findById(req.params.id);

      if (!task) {
        return res.status(404).json({
          errors: [{ msg: 'Tasks not found!' }],
        });
      }

      // Check if task belongs to current authenticated user.
      if (task.author.toString() !== req.user.id) {
        return res.status(404).json({
          errors: [{ msg: 'You are not authorized to perform this action!' }],
        });
      }

      await task.remove();
      return res.status(200).json({ msg: 'Task removed successfully!' });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        errors: [
          { msg: 'Unexpected server error happened. Please try again later!' },
        ],
      });
    }
  },
};
