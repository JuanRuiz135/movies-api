const express = require('express');

// Executes express and creates a new app.
const app = express();

// ctrl + shift + h to get the relative path
const { config } = require('./config/index');
const moviesApi = require('./routes/movies');


moviesApi(app);

app.listen(config.port, function() {
    console.log(`Listening http:localhost:${config.port}`);
});
