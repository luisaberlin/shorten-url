'use strict';

// Node module imports
const express = require('express');
const mongoose = require('mongoose');
//const morgan = require('morgan');

// Own modules imports 
const router = require('./src/router');

const app = express();
const port = 3030;
const dbUrl = 'mongodb://localhost/shortenurl';

/* DB SET UP */
//Set up default mongoose connection
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true});
//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//Bind connection to open event (to get notification when connection started)
db.once('open', function() {
    console.log('MongoDB connected.');
});

/* SERVER SET UP */

// Logger for all requests (set up as early as possible to notice everything)
//app.use(morgan('dev'));

// Middleware to parse the request body and place the result in request.body
//app.use(express.json());


// Routes
// Handle browser request for favicon
//app.get('*favicon.ico*', function (req, res, next) {
//    res.status(204).send('No content. No favicon available.');
//});

app.use('/', router);


// Error handling and requests without proper URLs
// Catch 405 and forward to error handler
//app.use(function (req, res, next) {
//    console.log("WHY AM I HERE")
//    let err = {};
//    err.status = 405;
//    err.message = 'Request is not allowed.';
//    next(err);
//});

// Error handler
//app.use(function (err, req, res, next) {
//    console.log(err);
//    res.status(err.status).send(`Error ${err.status}, ${err.message}`);
//});

// Start Server
app.listen(port, () => console.log(`Server listening on port ${port}.`));
