// Server routing.
const express = require('express');
const router = express.Router();

// Authentication.
const auth = require('../../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Validation.
const { check, validationResult } = require('express-validator');

// Private data configurations.
const config = require('config');

// Link User model.
const { User } = require('../../../models/User');

// @route     GET api/auth
// @desc      Get authenticated user.
// @access    Public
router.get('/', auth, async (req, res) => {
  try {
    // Retrieve user using id, exclude password when return.
    const user = await User.findById(req.user.id).select('-password');
    return res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .send('Unexpected server error happened. Please try again later!');
  }
});

// @route     POST api/auth
// @desc      Authenticate user & get token.
// @access    Public
router.post(
  '/',
  [
    // Data validations.
    check('email', 'Please enter a valid email!').isEmail(),
    check('password', 'Password is required!').exists()
  ],
  async (req, res) => {
    // Check for errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring data from request body.
    const { email, password } = req.body;

    try {
      // Check if user exists (check if email exists).
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          errors: [{ msg: 'Invalid credentials! Please try again!' }]
        });
      }

      // Check if password matches.
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: 'Invalid credentials! Please try again!' }]
        });
      }

      // Sign and return jsonwebtoken.
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 86400 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token: token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .send('Unexpected server error happened. Please try again later!');
    }
  }
);

module.exports = router;
