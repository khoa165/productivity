// Validation.
const { validationResult } = require('express-validator');

// Authentication.
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Private data configurations.
const dotenv = require('dotenv');
dotenv.config();

// Avatar from email.
const gravatar = require('gravatar');

// Link User model.
const User = require('../../../models/User');

module.exports = {
  register: async (req, res, _next) => {
    // Check for errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring data from request body.
    const { username, email, password, confirmedPassword } = req.body;

    try {
      // Check if user exists (check if email/username exists).
      let sameEmail = await User.findOne({ email });
      let sameUsername = await User.findOne({ username });
      const errors = [];
      if (sameEmail) {
        errors.push({
          msg: 'Email was already taken. Please enter another email!',
        });
      }
      if (sameUsername) {
        errors.push({
          msg: 'Username was already taken. Please enter another username!',
        });
      }
      if (password !== confirmedPassword) {
        errors.push({
          msg: 'Passwords do not match!',
        });
      }
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      // Get users gravatar.
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      // Create new user.
      user = new User({
        username,
        email,
        avatar,
        password,
      });

      // Encrypt password.
      const salt = await bcrypt.genSalt(15);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // Return jsonwebtoken.
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
          return res.status(200).json({ username, token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        errors: [
          { msg: 'Unexpected server error happened. Please try again later!' },
        ],
      });
    }
  },
};
