const mongoose = require('mongoose');
const request = require('supertest');
const expect = require('chai').expect;
const supertestPrefix = require('supertest-prefix').default;
const app = require('../../../../server');

module.exports = register = () => {
  describe('POST /users (register)', () => {
    const prefix = supertestPrefix('/api/v1');

    after((done) => {
      mongoose.connection.dropCollection('users', () => {
        done();
      });
    });

    it('should return token for valid input', (done) => {
      const user = {
        username: 'khoa165',
        email: 'khoa@gmail.com',
        password: 'abc123',
      };
      request(app)
        .post('/users')
        .use(prefix)
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('should return errors for missing email and password', (done) => {
      const user = {
        username: 'khoa165',
      };
      request(app)
        .post('/users')
        .use(prefix)
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.lengthOf(3);
          const msgs = [
            ['email', 'Please enter a valid email!'],
            ['password', 'Password must be at least 6 characters long!'],
            ['password', 'Password must contain a number!'],
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
  });
};
