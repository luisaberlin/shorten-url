'use strict';
const service = require('./service');

exports.post_url = (req, res) => {
    const url = req.body.url;
    const serverUrl = req.get('Host');
    const shortenUrl = service.postUrl(url, serverUrl);
    res.status(200).send(shortenUrl);
}

exports.get_url = (req, res) => {
    const code = req.params.code;
    const serverUrl = req.get('Host');
    const url = service.getUrlOfShortenUrl(code, serverUrl);
    res.status(200).send(url);
}