// Validation.
const { validationResult } = require('express-validator');

// Authentication.
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Sending email.
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

// Private data configurations.
const dotenv = require('dotenv');
dotenv.config();

// Email configurations
const emailId = process.env.MAILER_EMAIL_ID || 'projects.khoa165@gmail.com';
const emailPassword = process.env.MAILER_PASSWORD;
const smtpTransport = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
  auth: {
    user: emailId,
    pass: emailPassword,
  },
});

const handlebarsOptions = {
  viewEngine: 'handlebars',
  viewPath: path.resolve('./api/v1/templates/'),
  extName: '.html',
};

smtpTransport.use('compile', hbs(handlebarsOptions));

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

  request_password_reset: async (req, res, _next) => {
    // Check for errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring data from request body.
    const { email } = req.body;

    try {
      // Check if user exists (check if email exists).
      let user = await User.findOne({ email: email });
      if (!user) {
        return res.status(401).json({
          errors: [{ msg: 'Invalid credentials! Please try again!' }],
        });
      }

      // Create the random token.
      const token = crypto.randomBytes(20).toString('hex');

      // Update reset password token and expire time for token.
      await User.findByIdAndUpdate(
        { _id: user._id },
        {
          reset_password_token: token,
          reset_password_expires: Date.now() + 2 * 3600 * 1000,
          // Token expires after 2 hours
        }
      );

      const resetLink = process.env.WEBSITE_URL || 'http://localhost:3000';

      const emailData = {
        to: user.email,
        from: emailId,
        template: 'forgot-password-email',
        subject: 'Password reset link for CoffeeUp!',
        context: {
          url: `${resetLink}/auth/reset_password?token=${token}`,
          username: user.username,
        },
      };

      smtpTransport.sendMail(emailData, (err) => {
        if (err) throw err;

        return res.status(200).json({
          msg: 'Check your email for link to reset password!',
        });
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        error: 'Unexpected server error happened. Please try again later!',
      });
    }
  },

  reset_password: async (req, res, _next) => {
    // Check for errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring data from request body.
    const { newPassword, token } = req.body;

    try {
      // Check if token is valid.
      let user = await User.findOne({
        reset_password_token: token,
        reset_password_expires: {
          $gt: Date.now(),
        },
      });

      if (!user) {
        return res.status(401).json({
          errors: [{ msg: 'Password reset token is invalid or expired!' }],
        });
      }

      // Encrypt password.
      const salt = await bcrypt.genSalt(15);
      user.password = await bcrypt.hash(newPassword, salt);
      user.reset_password_token = undefined;
      user.reset_password_expires = undefined;
      await user.save();

      const emailData = {
        to: user.email,
        from: emailId,
        template: 'reset-password-email',
        subject: 'Password reset confirmation',
        context: {
          username: user.username,
        },
      };

      smtpTransport.sendMail(emailData, function (err) {
        if (err) throw err;

        return res.status(200).json({
          msg:
            'Password reset successfully. Confirmation was sent to your email!',
        });
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        error: 'Unexpected server error happened. Please try again later!',
      });
    }
  },
};
