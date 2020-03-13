const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

let db;
if (process.env.NODE_ENV === 'production') {
  db = process.env.MONGO_URI;
} else {
  db = 'mongodb://localhost/productivity_devdb';
}

const connectDB = async () => {
  try {
    // Connect to mongoDB.
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure.
    process.exit(1);
  }
};

module.exports = connectDB;
