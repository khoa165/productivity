// Validation.
const { validationResult } = require('express-validator');

// Link JobApplication model.
const JobApplication = require('../../../models/JobApplication');

module.exports = {
  create: async (req, res, _next) => {
    // Check for errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring data from request body.
    const {
      id,
      company,
      position,
      stage,
      deadline1,
      deadline2,
      linkName1,
      linkUrl1,
      linkName2,
      linkUrl2,
      linkName3,
      linkUrl3,
      note,
      companyWebsite,
      jobDescriptions,
      requiredSkills,
      applyDate,
      interviewDate,
    } = req.body;

    try {
      let jobApplication;
      if (id) {
        jobApplication = await JobApplication.findById(id);
        if (!jobApplication) {
          return res.status(404).json({
            errors: [{ msg: 'Job application not found!' }],
          });
        }

        // Check if job application belongs to current authenticated user.
        if (jobApplication.author.toString() !== req.user.id) {
          return res.status(404).json({
            errors: [{ msg: 'You are not authorized to perform this action!' }],
          });
        }

        jobApplication.company = company;
        jobApplication.position = position;
        jobApplication.stage = stage;
        jobApplication.note = note;

        jobApplication.deadline1 = deadline1;
        jobApplication.deadline2 = deadline2;

        jobApplication.linkName1 = linkName1;
        jobApplication.linkUrl1 = linkUrl1;
        jobApplication.linkName2 = linkName2;
        jobApplication.linkUrl2 = linkUrl2;
        jobApplication.linkName3 = linkName3;
        jobApplication.linkUrl3 = linkUrl3;

        jobApplication.companyWebsite = companyWebsite;
        jobApplication.jobDescriptions = jobDescriptions;
        jobApplication.requiredSkills = requiredSkills;
        jobApplication.applyDate = applyDate;
        jobApplication.interviewDate = interviewDate;
      } else {
        // Create new jobApplication, link author and save.
        jobApplication = new JobApplication({
          company,
          position,
          stage,
          deadline1,
          deadline2,
          linkName1,
          linkUrl1,
          linkName2,
          linkUrl2,
          linkName3,
          linkUrl3,
          note,
          companyWebsite,
          jobDescriptions,
          requiredSkills,
          applyDate,
          interviewDate,
        });
        jobApplication.author = req.user.id;
        await jobApplication.save();
      }

      return res.status(200).json(jobApplication);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        errors: [
          { msg: 'Unexpected server error happened. Please try again later!' },
        ],
      });
    }
  },

  getUserJobApplications: async (req, res, _next) => {
    try {
      // Get job applications of current authenticated user.
      const jobApplications = await JobApplication.find({
        author: req.user.id,
        is_default: true,
      });

      // Check and return jobApplications array if exists.
      if (!jobApplications) {
        return res.status(404).json({
          errors: [{ msg: 'Job applications not found!' }],
        });
      }
      return res.status(200).json(jobApplications);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        errors: [
          { msg: 'Unexpected server error happened. Please try again later!' },
        ],
      });
    }
  },

  deleteJobApplication: async (req, res, _next) => {
    try {
      const jobApplication = await JobApplication.findById(req.params.id);

      if (!jobApplication) {
        return res.status(404).json({
          errors: [{ msg: 'Job application not found!' }],
        });
      }

      // Check if jobApplication belongs to current authenticated user.
      if (jobApplication.author.toString() !== req.user.id) {
        return res.status(404).json({
          errors: [{ msg: 'You are not authorized to perform this action!' }],
        });
      }

      await jobApplication.remove();
      return res
        .status(200)
        .json({ msg: 'Job application removed successfully!' });
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
