const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Connect database.
connectDB();

// Init middleware.
app.use(express.json({ extended: false }));

app.get('/', (_req, res) => res.send('API Running'));

// Define routes.
const API = 'api/v1';
app.use(`/${API}/auth`, require(`./routes/${API}/auth`));
app.use(`/${API}/users`, require(`./routes/${API}/users`));
app.use(`/${API}/profile`, require(`./routes/${API}/profile`));
app.use(`/${API}/tasks`, require(`./routes/${API}/tasks`));

// Listening to app.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Export app for testing purposes.
module.exports = app;
