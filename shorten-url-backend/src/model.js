'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema
const UrlSchema = new Schema({
    url: {type: String, required: true},
    shortenUrl: {type: String, required: true}
});

// Compile model from schema and export it
module.exports = mongoose.model('Url', UrlSchema);
