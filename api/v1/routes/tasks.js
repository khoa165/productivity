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
// @desc      Create/update task.
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Task name is required!').notEmpty(),
      check('stage')
        .optional()
        .isIn(['New', 'In progress', 'Done', 'Cancelled', 'Postponed'])
        .withMessage(
          'Stage must be either New, In progress, Done, Cancelled, or Postponed!'
        ),
      check('note').optional().isString().withMessage('Note is not valid!'),
      check('deadline')
        .optional()
        .isISO8601()
        .withMessage('Deadline is not a valid date!'),
      check('link')
        .optional()
        .isURL()
        .withMessage('Invalid URL format for website/link!'),
    ],
  ],
  taskController.create
);

// @route     GET /tasks
// @desc      Get authenticated user's tasks.
// @access    Private
router.get('/', auth, taskController.getUserDefaultTasks);

// @route     DELETE /tasks/:id
// @desc      Delete a task.
// @access    Private
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;
