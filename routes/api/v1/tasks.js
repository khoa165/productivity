// Server routing.
const express = require('express');
const router = express.Router();

// Middleware.
const auth = require('../../../middleware/auth');

// Validation.
const { check, validationResult } = require('express-validator');

// Link Task model.
const Task = require('../../../models/Task');

// @route     POST /tasks
// @desc      Create new task.
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Task name is required!')
        .not()
        .isEmpty(),
      check('stage')
        .optional()
        .isIn(['New', 'Pending', 'Done', 'Cancelled'])
        .withMessage('Stage must be either New, Pending, Done or Cancelled!'),
      check('deadline')
        .optional()
        .isISO8601()
        .withMessage('Deadline is not a valid date!')
        .toDate()
        .isAfter(new Date().toString())
        .withMessage('Deadline must be after today!'),
      check('link')
        .optional()
        .isURL()
        .withMessage('Invalid URL format for website/link!')
    ]
  ],
  async (req, res) => {
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
      return res
        .status(500)
        .send('Unexpected server error happened. Please try again later!');
    }
  }
);

module.exports = router;
