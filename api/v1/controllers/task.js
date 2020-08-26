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
    const { taskId, name, stage, deadline, link } = req.body;

    try {
      let task;
      if (taskId) {
        task = await Task.findOneAndUpdate(
          {
            _id: taskId,
          },
          {
            name,
            stage,
            deadline,
            link,
          },
          {
            new: true,
          }
        );

        if (!task) {
          return res.status(404).json({ msg: 'Task not found!' });
        }
      } else {
        // Create new task, link author and save.
        task = new Task({ name, stage, deadline, link });
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
};
