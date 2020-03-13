const expect = require('chai').expect;
const User = require('../../../models/User');

describe('User model', () => {
  it('should return errors for mandatory fields', done => {
    const user = new User();
    user.validate(err => {
      expect(err.errors.username).to.exist;
      expect(err.errors.email).to.exist;
      expect(err.errors.password).to.exist;
      done();
    });
  });

  it('should not return errors for optional fields', done => {
    const user = new User();
    user.validate(err => {
      expect(err.errors.avatar).to.not.exist;
      expect(err.errors.admin).to.not.exist;
      expect(err.errors.created_at).to.not.exist;
      expect(err.errors.updated_at).to.not.exist;
      done();
    });
  });

  it('saves a user', done => {
    const khoa = new User({
      username: 'khoa165',
      password: 'password',
      email: 'khoa@gmail.com'
    });
    khoa
      .save()
      .then(() => {
        expect(khoa.isNew).to.be.false;
        expect(khoa)
          .to.have.property('username')
          .to.equal('khoa165');
        expect(khoa)
          .to.have.property('password')
          .to.equal('password');
        expect(khoa)
          .to.have.property('email')
          .to.equal('khoa@gmail.com');
        expect(khoa).to.have.property('admin').to.be.false;
        User.countDocuments({}, (err, count) => {
          expect(count).to.equal(1);
          done();
        });
      })
      .catch(err => {
        done(err);
      });
  });

  it('saves another user', done => {
    const harry = new User({
      username: 'harry165',
      password: 'password'
    });
    harry
      .save()
      .then(() => {
        assert(false);
      })
      .catch(err => {
        done();
      });
  });

  it('saves multiple users', done => {
    const abc = new User({
      username: 'abc',
      password: '123',
      email: 'abc@gmail.com'
    });
    const def = new User({
      username: 'def',
      password: '456',
      email: 'def@gmail.com'
    });
    abc
      .save()
      .then(() => {
        User.countDocuments({}, (err, count) => {
          expect(count).to.equal(1);
        });
      })
      .catch(err => {
        done(err);
      });
    def
      .save()
      .then(() => {
        User.countDocuments({}, (err, count) => {
          expect(count).to.equal(2);
          done();
        });
      })
      .catch(err => {
        done(err);
      });
  });
});
