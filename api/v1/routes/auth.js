// Server routing.
const express = require('express');
const router = express.Router();

// Middleware.
const auth = require('../../../middleware/auth');

// Validation.
const { check } = require('express-validator');

// Authentication controller.
const authController = require('../controllers/auth');

// @route     GET /auth
// @desc      Get authenticated user.
// @access    Public
router.get('/', auth, authController.getUser);

// @route     POST /auth
// @desc      Authenticate user & get token.
// @access    Public
router.post(
  '/',
  [
    // Data validations.
    check('credential', 'Email or username is required!').notEmpty(),
    check('password', 'Password is required!').notEmpty(),
  ],
  authController.login
);

// @route     POST /auth/forgot_password
// @desc      Request password reset.
// @access    Public
router.post(
  '/forgot_password',
  [
    // Data validations.
    check('email', 'Email is required!').isEmail(),
  ],
  authController.request_password_reset
);

// @route     POST /auth/reset_password
// @desc      Reset password.
// @access    Public
router.post(
  '/reset_password',
  [
    // Data validations.
    check('token').notEmpty(),
    check('newPassword')
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be between 6 and 20 characters long!')
      .matches(/\d/)
      .withMessage('Password must contain a number!'),
    check('confirmedPassword').notEmpty(),
  ],
  authController.reset_password
);
module.exports = router;
