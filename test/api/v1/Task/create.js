const mongoose = require('mongoose');
const request = require('supertest');
const expect = require('chai').expect;
const supertestPrefix = require('supertest-prefix').default;
const moment = require('moment');
const app = require('../../../../server');

module.exports = create = () => {
  describe('POST /tasks', () => {
    let token;
    const prefix = supertestPrefix('/api/v1');

    before((done) => {
      const user = {
        username: 'harry165',
        email: 'harry@gmail.com',
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
          token = res.body.token;
          done();
        });
    });

    after((done) => {
      mongoose.connection.dropCollection('tasks', () => {
        mongoose.connection.dropCollection('users', () => {
          done();
        });
      });
    });

    it('should return new task for valid task name', (done) => {
      const task = {
        name: 'Testing task routes',
      };
      request(app)
        .post('/tasks')
        .use(prefix)
        .send(task)
        .set({ Accept: 'application/json', 'x-auth-token': token })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('name').to.equal(task.name);
          done();
        });
    });

    it('should return errors for missing task name', (done) => {
      const task = {
        title: 'Testing task routes',
      };
      request(app)
        .post('/tasks')
        .use(prefix)
        .send(task)
        .set({ Accept: 'application/json', 'x-auth-token': token })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.not.have.any.keys('name', 'title');
          expect(res.body.errors).to.have.lengthOf(1);
          expect(res.body.errors[0]).to.include.all.keys('msg', 'param');
          expect(res.body.errors[0].msg).to.equal('Task name is required!');
          expect(res.body.errors[0].param).to.equal('name');
          done();
        });
    });

    it('should return new task for valid inputs', (done) => {
      const task = {
        name: 'Implement CoffeeUp API',
        stage: 'New',
        deadline: moment().add(10, 'days'),
      };
      request(app)
        .post('/tasks')
        .use(prefix)
        .send(task)
        .set({ Accept: 'application/json', 'x-auth-token': token })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.include.all.keys(
            '_id',
            'name',
            'stage',
            'deadline'
          );
          expect(res.body.name).to.equal(task.name);
          expect(res.body.stage).to.equal(task.stage);
          done();
        });
    });

    it('should return errors for invalid stage', (done) => {
      const task = {
        name: 'Keep testing!!!',
        stage: 'Unfinished',
      };
      request(app)
        .post('/tasks')
        .use(prefix)
        .send(task)
        .set({ Accept: 'application/json', 'x-auth-token': token })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.not.have.any.keys('_id', 'name', 'stage');
          expect(res.body.errors).to.have.lengthOf(1);
          expect(res.body.errors[0]).to.include.all.keys(
            'msg',
            'param',
            'value'
          );
          expect(res.body.errors[0].msg).to.equal(
            'Stage must be either New, In progress, Done, Cancelled, or Postponed!'
          );
          expect(res.body.errors[0].param).to.equal('stage');
          expect(res.body.errors[0].value).to.equal(task.stage);
          done();
        });
    });

    it('should return errors for invalid date', (done) => {
      const task = {
        name: 'Keep testing!!!',
        deadline: '09/04',
      };
      request(app)
        .post('/tasks')
        .use(prefix)
        .send(task)
        .set({ Accept: 'application/json', 'x-auth-token': token })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.not.have.any.keys('_id', 'name', 'deadline');
          expect(res.body.errors).to.have.lengthOf(1);
          expect(res.body.errors[0]).to.include.all.keys(
            'msg',
            'param',
            'value'
          );
          expect(res.body.errors[0].msg).to.equal(
            'Deadline is not a valid date!'
          );
          expect(res.body.errors[0].param).to.equal('deadline');
          done();
        });
    });

    it('should return errors for invalid link format', (done) => {
      const task = {
        name: 'Keep testing!!!',
        link: 'abc.def.123',
      };
      request(app)
        .post('/tasks')
        .use(prefix)
        .send(task)
        .set({ Accept: 'application/json', 'x-auth-token': token })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.not.have.any.keys('_id', 'name', 'link');
          expect(res.body.errors).to.have.lengthOf(1);
          expect(res.body.errors[0]).to.include.all.keys(
            'msg',
            'param',
            'value'
          );
          expect(res.body.errors[0].msg).to.equal(
            'Invalid URL format for website/link!'
          );
          expect(res.body.errors[0].param).to.equal('link');
          expect(res.body.errors[0].value).to.equal(task.link);
          done();
        });
    });
  });
};
