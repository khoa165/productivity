const create = require('./create');
const addTask = require('./addTask');

module.exports = tasklist = () => {
  describe('Task list routes', () => {
    create();
    addTask();
  });
};
