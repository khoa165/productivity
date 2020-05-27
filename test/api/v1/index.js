const user = require('./User/index');
const auth = require('./Auth/index');
const task = require('./Task/index');

module.exports = routes = () => {
  describe('Routes', () => {
    // user();
    // auth();
    task();
  });
};
