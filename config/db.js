const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

let db;
if (process.env.NODE_ENV === 'production') {
  db = process.env.MONGO_URI_PROD;
} else {
  console.log('Development environment...');
  db = process.env.MONGO_URI_DEV;
}

const connectDB = () => {
  mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  mongoose.connection
    .once('open', () => {
      console.log('MongoDB connected...');
    })
    .on('error', (err) => {
      console.error(err.message);
      // Exit process with failure.
      process.exit(1);
    });
};

module.exports = connectDB;
