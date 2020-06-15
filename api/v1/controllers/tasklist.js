// Validation.
const { validationResult } = require('express-validator');

// Link Task model.
const TaskList = require('../../../models/TaskList');

module.exports = {
  create: async (req, res, _next) => {
    // Check for errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring data from request body.
    const { tasklistId, name, stage, deadline, link } = req.body;

    try {
      let tasklist;
      if (tasklistId) {
        tasklist = await TaskList.findOneAndUpdate(
          {
            _id: tasklistId,
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
      } else {
        // Create new task, link author and save.
        tasklist = new TaskList({ name, stage, deadline, link });
        tasklist.author = req.user.id;
        await tasklist.save();
      }
      return res.status(200).json(tasklist);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        error: 'Unexpected server error happened. Please try again later!',
      });
    }
  },
};
