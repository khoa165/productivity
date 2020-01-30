const mongoose = require('mongoose');

// Link TaskList schema.
const { TaskListSchema } = require('./TaskList');

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

const User = mongoose.model('user', UserSchema);

module.exports = { User, UserSchema };
