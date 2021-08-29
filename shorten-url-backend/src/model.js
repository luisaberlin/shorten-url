'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema
const Url = new Schema({
    url: {type: String, required: true},
    shortenUrl: {type: String, required: true},
    code: {type: String, required: true},
});

// Compile model from schema and export it
module.exports = mongoose.model('Url', Url);