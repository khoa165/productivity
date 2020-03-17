const request = require('supertest');
const expect = require('chai').expect;
const app = require('../../../../../server');

module.exports = register = () => {
  describe('POST /users', () => {
    it('should return token for valid username, email, password', done => {
      const user = {
        username: 'khoa165',
        email: 'khoa@gmail.com',
        password: 'abc123'
      };
      request(app)
        .post('/users')
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('should return errors for missing email and password', done => {
      const user = {
        username: 'khoa165'
      };
      request(app)
        .post('/users')
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body).to.have.property('errors');
          const msgs = [
            ['email', 'Please enter a valid email!'],
            ['password', 'Password must be at least 6 characters long!'],
            ['password', 'Password must contain a number!']
          ];
          expect(res.body.errors).to.have.lengthOf(3);
          msgs.forEach((msg, i) => {
            expect(res.body.errors[i])
              .to.have.property('param')
              .to.equal(msg[0]);
            expect(res.body.errors[i])
              .to.have.property('msg')
              .to.equal(msg[1]);
          });
          done();
        });
    });
  });
};
