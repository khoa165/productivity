const expect = require('chai').expect;
const User = require('../../../models/User');

module.exports = read = () => {
  describe('#read', () => {
    let cat, dog, bird;
    beforeEach(done => {
      cat = new User({
        username: 'cutecat',
        password: 'password',
        email: 'cutecat@gmail.com'
      });
      dog = new User({
        username: 'cutedog',
        password: 'password',
        email: 'cutedog@gmail.com'
      });
      bird = new User({
        username: 'cutebird',
        password: 'password',
        email: 'cutebird@gmail.com'
      });

      Promise.all([cat.save(), dog.save(), bird.save()]).then(() => done());
    });

    it('should do sth', done => {
      User.find({ username: 'cutecat' })
        .then(users => {
          expect(users.length).to.equal(1);
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });
};
