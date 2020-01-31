const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  // Every task belongs to one or more task list.
  task_lists: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task_list'
      },
      name: String
    }
  ],

  // Basic info.
  name: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  stage: {
    type: String,
    required: true
  },
  deadline: Date,
  link: String,
  tag: [String],

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
