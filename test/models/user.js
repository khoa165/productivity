const create = require('./User/create');
const read = require('./User/read');

describe('User model', () => {
  create();
  read();
});
