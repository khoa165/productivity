const mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema({
  // Every job application has an author/owner.
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },

  // Basic info.
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  stage: String,
  deadline1: Date,
  deadline2: Date,
  note: String,

  companyWebsite: String,
  jobDescriptions: String,
  requiredSkills: String,

  applyDate: Date,
  interviewDate: Date,

  is_default: {
    type: Boolean,
    default: true,
  },

  linkName1: String,
  linkUrl1: String,
  linkName2: String,
  linkUrl2: String,
  linkName3: String,
  linkUrl3: String,

  // Job application tracking created.
  created_at: {
    type: Date,
    default: Date.now,
  },

  // Job application tracking last updated.
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = JobApplication = mongoose.model(
  'job_application',
  JobApplicationSchema
);
