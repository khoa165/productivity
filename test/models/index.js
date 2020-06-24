const mongoose = require('mongoose');
const user = require('./User/index');
const profile = require('./Profile/index');
const task = require('./Task/index');

module.exports = models = () => {
  describe('Models', () => {
    beforeEach((done) => {
      mongoose.connection.dropCollection('users', () => {
        done();
      });
    });

    user();
    profile();
    task();
  });
};
