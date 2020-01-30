const mongoose = require('mongoose');

// Link Task schema.
const { TaskSchema } = require('./Task');

const TaskListSchema = new mongoose.Schema({
  // Every task list has an author/owner.
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    name: String
  },

  // Every task list may have several collaborators.
  collaborators: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      name: String
    }
  ],

  // Every task list may have several subscribers.
  subscribers: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      name: String
    }
  ],

  // Task list visibility to public.
  visible: {
    type: Boolean,
    default: true
  },

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
  link: String,
  deadline: Date,
  tag: [String],

  // Task list created.
  created_at: {
    type: Date,
    default: Date.now
  },
  // Task list last updated.
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const TaskList = mongoose.model('task_list', TaskListSchema);

module.exports = { TaskList, TaskListSchema };
