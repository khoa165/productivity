const mongoose = require('mongoose');
const request = require('supertest');
const expect = require('chai').expect;
const supertestPrefix = require('supertest-prefix').default;
const moment = require('moment');
const app = require('../../../../server');

module.exports = addTask = () => {
  describe('PUT /tasklists/:tasklist_id/add/:task_id', () => {
    let token1;
    let user1;
    let token2;
    let user2;

    let tasklist;
    let taskUser1;
    let taskUser2;

    const prefix = supertestPrefix('/api/v1');

    before((done) => {
      user1 = {
        username: 'harry165',
        email: 'harry@gmail.com',
        password: 'abc123',
      };
      taskUser1 = {
        name: 'task created by user 1',
      };

      request(app)
        .post('/users')
        .use(prefix)
        .send(user1)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          token1 = res.body.token;

          request(app)
            .post('/tasks')
            .use(prefix)
            .send(taskUser1)
            .set({ Accept: 'application/json', 'x-auth-token': token1 })
            .expect('Content-Type', /json/)
            .end((err, res) => {
              if (err) return done(err);
              taskUser1 = res.body;
              done();
            });
        });
    });

    before((done) => {
      user2 = {
        username: 'khoa165',
        email: 'khoa@gmail.com',
        password: 'abc123',
      };
      taskUser2 = {
        name: 'task created by user 2',
      };

      request(app)
        .post('/users')
        .use(prefix)
        .send(user2)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          token2 = res.body.token;

          request(app)
            .post('/tasks')
            .use(prefix)
            .send(taskUser2)
            .set({ Accept: 'application/json', 'x-auth-token': token2 })
            .expect('Content-Type', /json/)
            .end((err, res) => {
              if (err) return done(err);
              taskUser2 = res.body;
              done();
            });
        });
    });

    beforeEach((done) => {
      tasklist = {
        name: 'Summer 2020',
        stage: 'New',
        deadline: moment().add(10, 'days'),
      };

      request(app)
        .post('/tasklists')
        .use(prefix)
        .send(tasklist)
        .set({ Accept: 'application/json', 'x-auth-token': token1 })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          tasklist = res.body;
          done();
        });
    });

    afterEach((done) => {
      mongoose.connection.dropCollection('task_lists', () => {
        mongoose.connection.dropCollection('users', () => {
          done();
        });
      });
    });

    it('should return error message for invalid task id', (done) => {
      const listId = tasklist._id;
      const taskId = mongoose.mongo.ObjectId();

      request(app)
        .put(`/tasklists/${listId}/add/${taskId}`)
        .use(prefix)
        .set({ Accept: 'application/json', 'x-auth-token': token1 })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.have.property('msg').to.equal('Task not found!');
          done();
        });
    });

    it("should add valid task id into tasklist's tasks array", (done) => {
      const listId = tasklist._id;
      const taskId = taskUser1._id;

      request(app)
        .put(`/tasklists/${listId}/add/${taskId}`)
        .use(prefix)
        .set({ Accept: 'application/json', 'x-auth-token': token1 })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.include.all.keys(
            'collaborators',
            'subscribers',
            'tasks',
            'name',
            'author',
            'created_at',
            'updated_at'
          );
          expect(res.body.tasks).to.have.lengthOf(1);
          expect(res.body.tasks[0]).to.equal(taskId);
          done();
        });
    });

    it('should not be able to add task created by other user', (done) => {
      const listId = tasklist._id;
      const taskId = taskUser2._id;

      request(app)
        .put(`/tasklists/${listId}/add/${taskId}`)
        .use(prefix)
        .set({ Accept: 'application/json', 'x-auth-token': token1 })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(401);
          expect(res.body)
            .to.have.property('msg')
            .to.equal('You are not authorized to perform this action!');
          done();
        });
    });

    it('should not be able to add task to task list created by other user', (done) => {
      const listId = tasklist._id;
      const taskId = taskUser2._id;

      request(app)
        .put(`/tasklists/${listId}/add/${taskId}`)
        .use(prefix)
        .set({ Accept: 'application/json', 'x-auth-token': token2 })
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(401);
          expect(res.body)
            .to.have.property('msg')
            .to.equal('You are not authorized to perform this action!');
          done();
        });
    });
  });
};
