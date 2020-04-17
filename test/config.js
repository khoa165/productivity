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
      mongoose.connection.db.dropDatabase(() => {
        console.log('Test database reset...');
        done();
      });
    })
    .on('error', err => {
      done(err);
    });
});

after(() => {
  console.log('Finish testing!');
});
