'use strict';
const express = require('express');
const morgan = require('morgan');

const router = require('./src/router');

const app = express();
const port = 3030;

// Logger for all requests (set up as early as possible to notice everything)
app.use(morgan('dev'));

// Middleware to parse the request body and place the result in request.body
app.use(express.json());

// Allow CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Routing
app.use('/', router);

// Start Server
app.listen(port, () => console.log(`Server listening on port ${port}.`));
