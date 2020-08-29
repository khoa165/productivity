// Validation.
const { validationResult } = require('express-validator');

// Link Task model.
const TaskList = require('../../../models/TaskList');

module.exports = {
  create: async (req, res, _next) => {
    // Check for errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring data from request body.
    const { tasklistId, name, stage, deadline, link } = req.body;

    try {
      let tasklist;
      // Check if form data includes tasklistId.
      // Update the task list if id is valid.
      // If not included, create new task list.
      if (tasklistId) {
        // If tasklistId if
        tasklist = await TaskList.findOneAndUpdate(
          {
            _id: tasklistId,
          },
          {
            name,
            stage,
            deadline,
            link,
          },
          {
            new: true,
          }
        );

        if (!tasklist) {
          return res.status(404).json({ msg: 'Task list not found!' });
        }
      } else {
        // Create new task, link author and save.
        tasklist = new TaskList({ name, stage, deadline, link });
        tasklist.author = req.user.id;
        await tasklist.save();
      }
      return res.status(200).json(tasklist);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        errors: [
          { msg: 'Unexpected server error happened. Please try again later!' },
        ],
      });
    }
  },

  addTask: async (req, res, _next) => {
    try {
      // Find task list by id given in parameters.
      const tasklist = await TaskList.findById(req.params.tasklist_id);
      if (!tasklist) {
        return res.status(404).json({ msg: 'Task list not found!' });
      }

      // Find task by id given in parameters.
      const task = await Task.findById(req.params.task_id);
      if (!task) {
        return res.status(404).json({ msg: 'Task not found!' });
      }

      if (
        tasklist.author.toString() !== req.user.id ||
        task.author.toString() !== req.user.id
      ) {
        return res
          .status(401)
          .json({ msg: 'You are not authorized to perform this action!' });
      }

      tasklist.tasks.push(task._id);
      await tasklist.save();

      return res.status(200).json(tasklist);
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
