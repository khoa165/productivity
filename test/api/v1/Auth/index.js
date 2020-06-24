const getUser = require('./getUser');
const login = require('./login');
const requestPasswordReset = require('./requestPasswordReset');
const resetPassword = require('./resetPassword');

module.exports = auth = () => {
  describe('Auth routes', () => {
    getUser();
    login();
    requestPasswordReset();
    resetPassword();
  });
};
