const mongoose = require('mongoose');
const request = require('supertest');
const expect = require('chai').expect;
const supertestPrefix = require('supertest-prefix').default;
const app = require('../../../../server');

module.exports = requestPasswordReset = () => {
  describe('POST /auth/forgot_password (requestPasswordReset)', () => {
    const prefix = supertestPrefix('/api/v1');

    before((done) => {
      const user = {
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
        .end((err, _res) => {
          if (err) return done(err);
          done();
        });
    });

    after((done) => {
      mongoose.connection.dropCollection('users', () => {
        done();
      });
    });

    it('should send email if user exists', (done) => {
      request(app)
        .post('/auth/forgot_password')
        .use(prefix)
        .send({ email: 'khoa165random@gmail.com' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(200);
          expect(res.body)
            .to.have.property('msg')
            .to.equal('Check your email for link to reset password!');
          done();
        });
    });
  });
};
