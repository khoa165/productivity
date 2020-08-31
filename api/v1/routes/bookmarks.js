// Server routing.
const express = require('express');
const router = express.Router();

// Middleware.
const auth = require('../../../middleware/auth');

// Validation.
const { check } = require('express-validator');

// Bookmark controller.
const bookmarkController = require('../controllers/bookmark');

// @route     POST /bookmarks
// @desc      Create new bookmark.
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Bookmark name is required!').notEmpty(),
      check('note')
        .optional()
        .isString()
        .withMessage('Deadline is not a valid date!'),
      check('link')
        .optional()
        .isURL()
        .withMessage('Invalid URL format for website/link!'),
    ],
  ],
  bookmarkController.create
);

// @route     GET /bookmarks
// @desc      Get authenticated user's bookmarks.
// @access    Private
router.get('/', auth, bookmarkController.getUserDefaultBookmarks);

// @route     DELETE /bookmarks/:id
// @desc      Delete a bookmark.
// @access    Private
router.delete('/:id', auth, bookmarkController.deleteBookmark);

module.exports = router;
