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
    const { name, stage, deadline, link } = req.body;

    try {
      // Create new task and save.
      const task = new Task({ name, stage, deadline, link });
      await task.save();
      return res.status(200).json(task);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        error: 'Unexpected server error happened. Please try again later!',
      });
    }
  },
};
