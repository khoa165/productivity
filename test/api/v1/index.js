const user = require('./User/index');
const auth = require('./Auth/index');
const task = require('./Task/index');
const tasklist = require('./TaskList/index');

module.exports = routes = () => {
  describe('Routes', () => {
    user();
    auth();
    task();
    // tasklist();
  });
};
