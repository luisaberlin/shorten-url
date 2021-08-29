'use strict';
const service = require('./service');

exports.post_url = (req, res) => {
    const shortenUrl = service.postUrl();
    res.status(200).send(shortenUrl);
}

exports.get_shorten_url = (req, res) => {
    const shortenUrl = service.getShortenUrl();
    res.status(200).send(shortenUrl);
}