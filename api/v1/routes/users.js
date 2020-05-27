// Server routing.
const express = require('express');
const router = express.Router();

// Validation.
const { check } = require('express-validator');

// User controller.
const userController = require('../controllers/user');

// @route     POST /users
// @desc      Register user
// @access    Public
router.post(
  '/',
  [
    // Data validations.
    check('username')
      .matches(/^[a-z][a-z0-9]{3,}$/)
      .withMessage(
        'Username must be at least 4 characters long, start with a letter and only contain letters or digits in lowercase and no space!'
      ),
    check('email', 'Please enter a valid email!').isEmail(),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long!')
      .matches(/\d/)
      .withMessage('Password must contain a number!'),
  ],
  userController.register
);

module.exports = router;
