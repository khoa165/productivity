const mongoose = require('mongoose');

const TaskListSchema = new mongoose.Schema({
  // Every task list has an author/owner.
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },

  // Every task list may have several collaborators.
  collaborators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],

  // Every task list may have several subscribers.
  subscribers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],

  // Every task list may have multiple tasks.
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'task',
    },
  ],

  // Basic info.
  name: {
    type: String,
    required: true,
  },
  stage: {
    type: String,
    enum: ['New', 'In progress', 'Done', 'Cancelled', 'Postponed'],
  },
  deadline: Date,
  link: String,

  // Task list created.
  created_at: {
    type: Date,
    default: Date.now,
  },

  // Task list last updated.
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = TaskList = mongoose.model('task_list', TaskListSchema);
