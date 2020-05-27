const getUser = require('./getUser');
const login = require('./login');

module.exports = auth = () => {
  describe('Auth routes', () => {
    getUser();
    login();
  });
};
