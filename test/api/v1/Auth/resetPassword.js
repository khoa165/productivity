const mongoose = require('mongoose');
const request = require('supertest');
const expect = require('chai').expect;
const supertestPrefix = require('supertest-prefix').default;
const crypto = require('crypto');
const app = require('../../../../server');

module.exports = requestPasswordReset = () => {
  describe('POST /auth/reset_password (requestPasswordReset)', () => {
    const prefix = supertestPrefix('/api/v1');
    let user;
    let token;

    before((done) => {
      user = {
        username: 'khoa165',
        email: 'khoa165random@gmail.com',
        password: 'abc123',
        confirmedPassword: 'abc123',
      };
      request(app)
        .post('/users')
        .use(prefix)
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);

          const username = res.body.username;
          User.findOne({ username }, (err, foundUser) => {
            if (!err && user) {
              user = foundUser;
              token = crypto.randomBytes(20).toString('hex');
              user.reset_password_token = token;
              user.reset_password_expires = Date.now() + 2 * 3600 * 1000;
              user.save(done);
            } else {
              return done(err);
            }
          });
        });
    });

    after((done) => {
      mongoose.connection.dropCollection('users', () => {
        done();
      });
    });

    it('should return errors for invalid password format', (done) => {
      expect(user.reset_password_token).to.equal(token);
      const data = {
        token: token,
        newPassword: 'gato',
        confirmedPassword: 'gato',
      };
      request(app)
        .post('/auth/reset_password')
        .use(prefix)
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.lengthOf(2);
          const msgs = [
            [
              'newPassword',
              'Password must be between 6 and 20 characters long!',
            ],
            ['newPassword', 'Password must contain a number!'],
          ];
          msgs.forEach((msg, i) => {
            expect(res.body.errors[i])
              .to.have.property('param')
              .to.equal(msg[0]);
            expect(res.body.errors[i]).to.have.property('msg').to.equal(msg[1]);
          });
          done();
        });
    });

    it('should reset password successfully and new password can be used to login', (done) => {
      expect(user.reset_password_token).to.equal(token);
      const data = {
        token: token,
        newPassword: 'holagato123',
        confirmedPassword: 'holagato123',
      };
      request(app)
        .post('/auth/reset_password')
        .use(prefix)
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(200);

          const newLoginCredential = {
            credential: 'khoa165',
            password: 'holagato123',
          };
          request(app)
            .post('/auth')
            .use(prefix)
            .send(newLoginCredential)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.statusCode).to.equal(200);
              expect(res.body).to.have.property('token');
              done();
            });
        });
    });
  });
};
