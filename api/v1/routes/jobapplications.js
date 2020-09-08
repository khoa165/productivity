// Server routing.
const express = require('express');
const router = express.Router();

// Middleware.
const auth = require('../../../middleware/auth');

// Validation.
const { check } = require('express-validator');

// Job application controller.
const jobApplicationController = require('../controllers/jobapplication');

// @route     POST /jobapplications
// @desc      Create/update job application.
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('company', 'Company name is required!').notEmpty(),
      check('position', 'Applied position is required!').notEmpty(),
      check('stage').optional().isString().withMessage('Stage is not valid!'),
      check('note').optional().isString().withMessage('Note is not valid!'),
      check('term').optional().isString().withMessage('Term is not valid!'),
      check('location')
        .optional()
        .isString()
        .withMessage('Location is not valid!'),
      check('referrer')
        .optional()
        .isString()
        .withMessage('Referrer is not valid!'),

      check('deadline1')
        .optional()
        .isISO8601()
        .withMessage('Deadline is not a valid date!'),
      check('deadline2')
        .optional()
        .isISO8601()
        .withMessage('Deadline is not a valid date!'),

      check('linkName1')
        .optional()
        .isString()
        .withMessage('Link name is not valid!'),
      check('linkUrl1')
        .optional()
        .isURL()
        .withMessage('Invalid URL format for website/link!'),
      check('linkName2')
        .optional()
        .isString()
        .withMessage('Link name is not valid!'),
      check('linkUrl2')
        .optional()
        .isURL()
        .withMessage('Invalid URL format for website/link!'),
      check('linkName3')
        .optional()
        .isString()
        .withMessage('Link name is not valid!'),
      check('linkUrl3')
        .optional()
        .isURL()
        .withMessage('Invalid URL format for website/link!'),

      check('jobDescriptions')
        .optional()
        .isString()
        .withMessage('Job descriptions are not valid!'),
      check('requiredSkills')
        .optional()
        .isString()
        .withMessage('Required skills are not valid!'),

      check('companyWebsite')
        .optional()
        .isURL()
        .withMessage('Invalid URL format for website/link!'),
      check('applyDate')
        .optional()
        .isISO8601()
        .withMessage('Apply date is not a valid date!'),
      check('interviewDate')
        .optional()
        .isISO8601()
        .withMessage('Interview date is not a valid date!'),
    ],
  ],
  jobApplicationController.create
);

// @route     GET /jobapplications
// @desc      Get authenticated user's job applications.
// @access    Private
router.get('/', auth, jobApplicationController.getUserJobApplications);

// @route     DELETE /jobapplications/:id
// @desc      Delete a job application.
// @access    Private
router.delete('/:id', auth, jobApplicationController.deleteJobApplication);

module.exports = router;
