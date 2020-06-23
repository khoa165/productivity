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
    check('credential', 'Email or username is required!').not().isEmpty(),
    check('password', 'Password is required!').not().isEmpty(),
  ],
  authController.login
);

// @route     POST /forgot_password
// @desc      Request password reset.
// @access    Public
router.post(
  '/',
  [
    // Data validations.
    check('email', 'Email is required!').not().isEmpty(),
  ],
  authController.request_password_reset
);

// @route     POST /reset_password
// @desc      Reset password.
// @access    Public
router.post(
  '/',
  [
    // Data validations.
    check('email', 'Email is required!').not().isEmpty(),
  ],
  authController.reset_password
);
module.exports = router;
