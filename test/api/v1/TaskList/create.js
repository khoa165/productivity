const mongoose = require('mongoose');
const request = require('supertest');
const expect = require('chai').expect;
const supertestPrefix = require('supertest-prefix').default;
const moment = require('moment');
const app = require('../../../../server');

module.exports = create = () => {
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
    mongoose.connection.dropCollection('task_lists', () => {
      mongoose.connection.dropCollection('users', () => {
        done();
      });
    });
  });

  describe('POST /tasklists', () => {
    it('should return new task for valid task list name', (done) => {
      const tasklist = {
        name: 'Testing task list routes',
      };
      request(app)
        .post('/tasklists')
        .use(prefix)
        .send(tasklist)
        .set({ Accept: 'application/json', 'x-auth-token': token })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('name').to.equal(tasklist.name);
          done();
        });
    });

    it('should return errors for missing task list name', (done) => {
      const tasklist = {
        title: 'Testing task list routes',
      };
      request(app)
        .post('/tasklists')
        .use(prefix)
        .send(tasklist)
        .set({ Accept: 'application/json', 'x-auth-token': token })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.not.have.any.keys('name', 'title');
          expect(res.body.errors).to.have.lengthOf(1);
          expect(res.body.errors[0]).to.include.all.keys('msg', 'param');
          expect(res.body.errors[0].msg).to.equal(
            'Task list name is required!'
          );
          expect(res.body.errors[0].param).to.equal('name');
          done();
        });
    });

    it('should return new task for valid inputs', (done) => {
      const tasklist = {
        name: 'Implement CoffeeUp API',
        stage: 'New',
        deadline: moment().add(10, 'days'),
      };
      request(app)
        .post('/tasklists')
        .use(prefix)
        .send(tasklist)
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
          expect(res.body.name).to.equal(tasklist.name);
          expect(res.body.stage).to.equal(tasklist.stage);
          done();
        });
    });

    it('should return errors for invalid stage', (done) => {
      const tasklist = {
        name: 'Keep testing!!!',
        stage: 'Unfinished',
      };
      request(app)
        .post('/tasklists')
        .use(prefix)
        .send(tasklist)
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
            'Stage must be either New, In progress, Done or Cancelled!'
          );
          expect(res.body.errors[0].param).to.equal('stage');
          expect(res.body.errors[0].value).to.equal(tasklist.stage);
          done();
        });
    });

    it('should return errors for invalid date', (done) => {
      const tasklist = {
        name: 'Keep testing!!!',
        deadline: moment().subtract(1, 'days'),
      };
      request(app)
        .post('/tasklists')
        .use(prefix)
        .send(tasklist)
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
            'Deadline must be after today!'
          );
          expect(res.body.errors[0].param).to.equal('deadline');
          done();
        });
    });

    it('should return errors for invalid link format', (done) => {
      const tasklist = {
        name: 'Keep testing!!!',
        link: 'abc.def.123',
      };
      request(app)
        .post('/tasklists')
        .use(prefix)
        .send(tasklist)
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
          expect(res.body.errors[0].value).to.equal(tasklist.link);
          done();
        });
    });
  });
};
