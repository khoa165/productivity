// Validation.
const { validationResult } = require('express-validator');

// Authentication.
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Private data configurations.
const dotenv = require('dotenv');
dotenv.config();

// Link User model.
const User = require('../../../models/User');

module.exports = {
  getUser: async (req, res, _next) => {
    try {
      // Retrieve user using id, exclude password when return.
      const user = await User.findById(req.user.id).select('-password');
      if (!user) {
        return res.status(404).json({ msg: 'User not found!' });
      }

      return res.status(200).json(user);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        error: 'Unexpected server error happened. Please try again later!',
      });
    }
  },

  login: async (req, res, _next) => {
    // Check for errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring data from request body.
    const { credential, password } = req.body;

    try {
      // Check if user exists (check if email/username exists).
      let user = await User.findOne({ email: credential });
      if (!user) {
        user = await User.findOne({ username: credential });
        if (!user) {
          return res.status(401).json({
            errors: [{ msg: 'Invalid credentials! Please try again!' }],
          });
        }
      }

      // Check if password matches.
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          errors: [{ msg: 'Invalid credentials! Please try again!' }],
        });
      }

      // Sign and return jsonwebtoken.
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: 86400 },
        (err, token) => {
          if (err) throw err;
          return res.status(200).json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        error: 'Unexpected server error happened. Please try again later!',
      });
    }
  },
};
