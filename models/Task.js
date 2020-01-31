const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  // Every task has an author/owner.
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },

  // Every task belongs to one or more task list.
  tasklists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tasklist'
    }
  ],

  // Basic info.
  name: {
    type: String,
    required: true
  },
  stage: {
    type: String,
    enum: ['New', 'Pending', 'Done', 'Cancelled']
  },
  deadline: Date,
  link: String,

  // Task created.
  created_at: {
    type: Date,
    default: Date.now
  },
  // Task last updated.
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = Task = mongoose.model('task', TaskSchema);
