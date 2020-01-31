// Server routing.
const express = require('express');
const router = express.Router();

// Middlewares.
const auth = require('../../../middleware/auth');
const verifyURLs = require('../../../middleware/verifyURLs');

// Validation.
const { check, validationResult } = require('express-validator');

// Link User and Profile model.
const User = require('../../../models/User');
const Profile = require('../../../models/Profile');

// @route     GET /profile/me
// @desc      Get current user profile.
// @access    Private
router.get('/me', auth, async (req, res) => {
  try {
    // Get profile corresponding to current user's id. Populate name, avatar, and created_at from User model.
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar', 'created_at']);

    // Check and return profile if exists.
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found!' });
    }
    return res.status(200).json(profile);
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .send('Unexpected server error happened. Please try again later!');
  }
});

// @route     POST /profile
// @desc      Create or update user profile.
// @access    Private
router.post(
  '/',
  [
    auth,
    // Data validations.
    [
      check('first_name', 'First name is required!')
        .not()
        .isEmpty(),
      check('last_name', 'Last name is required!')
        .not()
        .isEmpty(),
      check('visible')
        .optional()
        .isBoolean()
        .withMessage('Profile visibility has to be true or false!'),
      // verifyURLs([
      //   'LinkedIn',
      //   'GitHub',
      //   'portfolio',
      //   'blog',
      //   'Facebook',
      //   'YouTube',
      //   'Twitter',
      //   'Instagram'
      // ])
      check('linkedin')
        .optional()
        .isURL()
        .withMessage('Invalid URL format for LinkedIn!'),
      check('github')
        .optional()
        .isURL()
        .withMessage('Invalid URL format for GitHub!'),
      check('portfolio')
        .optional()
        .isURL()
        .withMessage('Invalid URL format for portfolio!'),
      check('blog')
        .optional()
        .isURL()
        .withMessage('Invalid URL format for blog!'),
      check('facebook')
        .optional()
        .isURL()
        .withMessage('Invalid URL format for Facebook!'),
      check('youtube')
        .optional()
        .isURL()
        .withMessage('Invalid URL format for YouTube!'),
      check('twitter')
        .optional()
        .isURL()
        .withMessage('Invalid URL format for Twitter!'),
      check('instagram')
        .optional()
        .isURL()
        .withMessage('Invalid URL format for Instagram!')
    ]
  ],
  async (req, res) => {
    // Check for errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring data from request body.
    const {
      visible,
      first_name,
      last_name,
      location,
      company,
      bio,
      skills,
      linkedin,
      github,
      portfolio,
      blog,
      facebook,
      youtube,
      twitter,
      instagram
    } = req.body;

    // Build profile object.
    const profileFields = {};
    profileFields.user = req.user.id;
    if (visible !== undefined) profileFields.visible = visible;
    if (first_name) profileFields.first_name = first_name;
    if (last_name) profileFields.last_name = last_name;
    if (location) profileFields.location = location;
    if (company) profileFields.company = company;
    if (bio) profileFields.bio = bio;

    // Map through skills, split by comma, trim leading and trailing whitespaces.
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // Build social object
    profileFields.social = {};
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (github) profileFields.social.github = github;
    if (portfolio) profileFields.social.portfolio = portfolio;
    if (blog) profileFields.social.blog = blog;
    if (facebook) profileFields.social.facebook = facebook;
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;

    // Profile last updated at.
    profileFields.date = new Date();

    try {
      let profile = await Profile.findOneAndUpdate(
        // First parameter is for filter, in this case use username to filter corresponding profile.
        // Second parameter is for document data.
        // Third parameter is options.
        // Set new to true to return document after update.
        // Set upsert to true to create document if not exists, otherwise update it.
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );
      return res.status(200).json(profile);
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .send('Unexpected server error happened. Please try again later!');
    }
  }
);

// @route     GET /profile/:username
// @desc      Get profile by username.
// @access    Public
router.get('/:username', async (req, res) => {
  try {
    // Get user corresponding to username.
    const user = await User.findOne({
      username: req.params.username
    });

    // Check if user with given username exists.
    if (!user) {
      return res.status(404).json({ msg: 'User not found!' });
    }

    // Get profile corresponding to user's id. Populate name and avatar from User model.
    const profile = await Profile.findOne({
      user: user.id
    }).populate('user', ['avatar', 'created_at']);

    // Check and return profile only if exists and visible set to true.
    if (!profile || !profile.visible) {
      return res.status(404).json({ msg: 'Profile not found!' });
    }
    return res.status(200).json(profile);
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .send('Unexpected server error happened. Please try again later!');
  }
});

// @route     DELETE /profile
// @desc      Delete profile, user & other data.
// @access    Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    return res.status(200).json({
      msg: 'Account deleted successfully. We are sad to see you go!'
    });
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .send('Unexpected server error happened. Please try again later!');
  }
});

module.exports = router;
