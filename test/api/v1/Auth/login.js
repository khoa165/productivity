const mongoose = require('mongoose');
const request = require('supertest');
const expect = require('chai').expect;
const supertestPrefix = require('supertest-prefix').default;
const app = require('../../../../server');

module.exports = login = () => {
  const prefix = supertestPrefix('/api/v1');

  describe('POST /auth (login)', () => {
    before((done) => {
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
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });

    after((done) => {
      mongoose.connection.dropCollection('users', () => {
        done();
      });
    });

    it('should return token for valid username and password', (done) => {
      const user = {
        credential: 'khoa165',
        password: 'abc123',
      };
      request(app)
        .post('/auth')
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

    it('should return token for valid email and password', (done) => {
      const user = {
        credential: 'khoa@gmail.com',
        password: 'abc123',
      };
      request(app)
        .post('/auth')
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

    it('should return errors for missing credential and password', (done) => {
      request(app)
        .post('/auth')
        .use(prefix)
        .send({})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.lengthOf(2);
          const msgs = [
            ['credential', 'Email or username is required!'],
            ['password', 'Password is required!'],
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

    it('should return errors for credential not existing', (done) => {
      const user = {
        credential: 'khoa165@gmail.com',
        password: '123456789',
      };
      request(app)
        .post('/auth')
        .use(prefix)
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.lengthOf(1);
          expect(res.body.errors[0])
            .to.have.property('msg')
            .to.equal('Invalid credentials! Please try again!');
          done();
        });
    });

    it('should return errors for valid credential and incorrect password', (done) => {
      const user = {
        credential: 'khoa@gmail.com',
        password: '123456789',
      };
      request(app)
        .post('/auth')
        .use(prefix)
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.lengthOf(1);
          expect(res.body.errors[0])
            .to.have.property('msg')
            .to.equal('Invalid credentials! Please try again!');
          done();
        });
    });
  });
};
