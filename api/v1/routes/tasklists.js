// Server routing.
const express = require('express');
const router = express.Router();

// Middleware.
const auth = require('../../../middleware/auth');

// Validation.
const { check } = require('express-validator');

// Task controller.
const tasklistController = require('../controllers/tasklist');

// @route     POST /tasklists
// @desc      Create new task list.
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Task list name is required!').notEmpty(),
      check('stage')
        .optional()
        .isIn(['New', 'In progress', 'Done', 'Cancelled', 'Postponed'])
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
  tasklistController.create
);

// @route     PUT /tasklists/:tasklist_id/add/:task_id
// @desc      Add existing task to existing task list.
// @access    Private
router.put('/:tasklist_id/add/:task_id', auth, tasklistController.addTask);

module.exports = router;
