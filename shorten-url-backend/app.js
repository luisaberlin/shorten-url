'use strict';
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

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
db.once('open', () => console.log('MongoDB connected.'));
    
/* SERVER SET UP */
// Logger for all requests
app.use(morgan('dev'));

// Parse the request body and place the result in request.body
app.use(express.json());

// Allow CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Handle browser request for favicon
app.get('*favicon.ico*', function (req, res, next) {
    res.status(204).send('No content. No favicon available.');
});

// Routing
app.use('/', router);

// Error handling and requests without proper URLs
app.use(function (req, res, next) {
    res.status(405).send('Method Not Allowed.');
});

// Start Server
app.listen(port, () => console.log(`Server listening on port ${port}.`));
