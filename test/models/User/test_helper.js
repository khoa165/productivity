const mongoose = require('mongoose');

before(done => {
  mongoose.connect('mongodb://localhost/productivity_testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
  mongoose.connection
    .once('open', () => {
      console.log('Test database connected...');
      mongoose.connection.db.dropDatabase('users', () => {
        done();
      });
    })
    .on('error', error => {
      console.warn('Warning', error);
    });
});

beforeEach(done => {
  mongoose.connection.db.dropCollection('users', () => {
    done();
  });
});

after(() => {
  console.log('Finish testing!');
});
