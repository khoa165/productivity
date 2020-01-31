const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: String,
  admin: {
    type: Boolean,
    default: false
  },

  // Account created.
  created_at: {
    type: Date,
    default: Date.now
  },
  // Account last updated.
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', UserSchema);
