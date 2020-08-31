'use strict';

const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const app = express();

// Connect database.
connectDB();

const limiter = new rateLimit({
  windowMS: 15 * 60 * 100, // 15 minutes
  max: 1000, // limit of number of request per IP
  delayMs: 0, // delay between 2 consecutive requests is 100 ms.
});

// Init middleware.
app.use(helmet());
app.use(limiter);
app.use(express.json({ extended: false }));

app.get('/', (_req, res) => res.send('API Running'));

// Define routes.
const API = 'api/v1';
app.use(`/${API}/auth`, require(`./${API}/routes/auth`));
app.use(`/${API}/users`, require(`./${API}/routes/users`));
app.use(`/${API}/profile`, require(`./${API}/routes/profile`));
app.use(`/${API}/tasks`, require(`./${API}/routes/tasks`));
app.use(`/${API}/tasklists`, require(`./${API}/routes/tasklists`));
app.use(`/${API}/bookmarks`, require(`./${API}/routes/bookmarks`));

// Listening to app.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Export app for testing purposes.
module.exports = app;
