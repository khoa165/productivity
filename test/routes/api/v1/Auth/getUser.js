const mongoose = require('mongoose');
const request = require('supertest');
const expect = require('chai').expect;
const supertestPrefix = require('supertest-prefix').default;
const app = require('../../../../../server');

module.exports = getUser = () => {
  let token;
  const prefix = supertestPrefix('/api/v1');

  before((done) => {
    const user = {
      username: 'harry165',
      email: 'harry@gmail.com',
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
        token = res.body.token;
        done();
      });
  });

  after((done) => {
    mongoose.connection.dropCollection('users', () => {
      done();
    });
  });

  describe('POST /auth', () => {
    it('should return user if valid token is passed', (done) => {
      request(app)
        .get('/auth')
        .use(prefix)
        .set({ Accept: 'application/json', 'x-auth-token': token })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('username').to.equal('harry165');
          expect(res.body)
            .to.have.property('email')
            .to.equal('harry@gmail.com');
          done();
        });
    });
  });
};
