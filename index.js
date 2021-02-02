const { config } = require('./config/index');
const express = require('express');
const moviesApi = require('./routes/movies');
// Error handlers
const { logErrors, errorHandler, wrapErrors } = require('./utils/middleware/errorHandler');
const { notFoundHandler } = require('./utils/middleware/notFoundHandler');

// Executes express and creates a new app.
const app = express();

// body parser
app.use(express.json());

// Routes
moviesApi(app);
// Catch 404
app.use(notFoundHandler);


// Error handling middleware, always after routes
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function() {
    console.log(`Listening http:localhost:${config.port}`);
});
