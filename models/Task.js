const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  // Every task has an author/owner.
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },

  // Basic info.
  name: {
    type: String,
    required: true,
  },
  stage: {
    type: String,
    enum: ['New', 'In progress', 'Done', 'Cancelled'],
  },
  deadline: Date,
  link: String,

  // Task created.
  created_at: {
    type: Date,
    default: Date.now,
  },

  // Task last updated.
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Task = mongoose.model('task', TaskSchema);
