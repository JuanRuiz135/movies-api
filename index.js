const express = require('express');

// Executes express and creates a new app.
const app = express();

// ctrl + shift + h to get the relative path
const { config } = require('./config/index');
const moviesApi = require('./routes/movies');

const { logErrors, errorHandler } = require('./utils/middleware/errorHandler');

// body parser
app.use(express.json());

// Routes
moviesApi(app);

// Error handling, always after routes
app.use(logErrors);
app.use(errorHandler);

app.listen(config.port, function() {
    console.log(`Listening http:localhost:${config.port}`);
});
