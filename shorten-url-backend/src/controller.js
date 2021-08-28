'use strict';
const service = require('./service');

exports.get_shorten_url = (req, res) => {
    const shortenUrl = service.getShortenUrl();
    res.status(200).send(shortenUrl);
}