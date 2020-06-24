// Server routing.
const express = require('express');
const router = express.Router();

// Middleware.
const auth = require('../../../middleware/auth');

// Validation.
const { check } = require('express-validator');

// Task controller.
const taskController = require('../controllers/task');

// @route     POST /tasks
// @desc      Create new task.
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Task name is required!').notEmpty(),
      check('stage')
        .optional()
        .isIn(['New', 'In progress', 'Done', 'Cancelled'])
        .withMessage(
          'Stage must be either New, In progress, Done or Cancelled!'
        ),
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
        .withMessage('Invalid URL format for website/link!'),
    ],
  ],
  taskController.create
);

module.exports = router;
