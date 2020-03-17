const create = require('./create');
const read = require('./read');

module.exports = user = () => {
  describe('User model', () => {
    create();
    read();
  });
};
