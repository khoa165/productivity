const expect = require('chai').expect;
const User = require('../../../models/User');

module.exports = create = () => {
  describe('#create', () => {
    it('should return errors for mandatory fields', done => {
      const user = new User();
      user.validate(err => {
        expect(err.errors.username).to.exist;
        expect(err.errors.email).to.exist;
        expect(err.errors.password).to.exist;
      });
      done();
    });

    it('should not return errors for optional fields', done => {
      const user = new User();
      user.validate(err => {
        expect(err.errors.avatar).to.not.exist;
        expect(err.errors.admin).to.not.exist;
        expect(err.errors.created_at).to.not.exist;
        expect(err.errors.updated_at).to.not.exist;
      });
      done();
    });

    it('should save a valid user', done => {
      const khoa = new User({
        username: 'khoa165',
        password: 'password',
        email: 'khoa@gmail.com'
      });
      expect(khoa.isNew).to.be.true;
      khoa
        .save()
        .then(user => {
          expect(user).to.exist;
          expect(user.isNew).to.be.false;
          expect(user)
            .to.have.property('username')
            .to.equal('khoa165');
          expect(user)
            .to.have.property('password')
            .to.equal('password');
          expect(user)
            .to.have.property('email')
            .to.equal('khoa@gmail.com');
          expect(user).to.have.property('_id');
          expect(user).to.have.property('avatar');
          expect(user).to.have.property('created_at');
          expect(user).to.have.property('updated_at');
          expect(user).to.have.property('admin').to.be.false;
          User.countDocuments({}, (_err, count) => {
            expect(count).to.equal(1);
          });
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it('should not save an invalid user', done => {
      const harry = new User({
        username: 'harry165',
        password: 'password'
      });
      expect(harry.isNew).to.be.true;
      harry
        .save()
        .then(user => {
          assert(false);
        })
        .catch(err => {
          expect(harry.isNew).to.be.true;
          expect(err.errors.email).to.exist;
          done();
        });
    });

    it('should save multiple valid users', done => {
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

      expect(abc.isNew).to.be.true;
      expect(def.isNew).to.be.true;

      abc
        .save()
        .then(user => {
          expect(user).to.exist;
          expect(abc.isNew).to.be.false;
          User.countDocuments({}, (_err, count) => {
            expect(count).to.equal(1);
          });

          def
            .save()
            .then(user => {
              expect(user).to.exist;
              expect(def.isNew).to.be.false;
              User.countDocuments({}, (_err, count) => {
                expect(count).to.equal(2);
              });
              done();
            })
            .catch(err => {
              done(err);
            });
        })
        .catch(err => {
          done(err);
        });
    });
  });
};
