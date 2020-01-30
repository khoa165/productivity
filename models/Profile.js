const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  // Reference to user.
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },

  // Profile visibility.
  visible: {
    type: Boolean,
    default: true
  },

  // Basic info.
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  location: String,
  lat: Number,
  lng: Number,
  company: String,

  // Detailed info: skills, experiences, education.
  skills: {
    type: [String],
    required: true
  },
  experiences: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: String,
      from: {
        type: Date,
        required: true
      },
      to: Date,
      current: {
        type: Boolean,
        default: false
      },
      description: String
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: String,
      study_fields: String,
      from: {
        type: Date,
        required: true
      },
      to: Date,
      current: {
        type: Boolean,
        default: false
      },
      description: String
    }
  ],

  // Social platforms.
  social: {
    linkedin: String,
    github: String,
    portfolio: String,
    blog: String,
    facebook: String,
    youtube: String,
    twitter: String,
    instagram: String
  },

  // Last updated.
  date: {
    type: Date,
    default: Date.now
  }
});

const Profile = mongoose.model('profile', ProfileSchema);

module.exports = { Profile, ProfileSchema };
