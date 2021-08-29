'use strict';
const service = require('./service');

exports.post_url = (req, res) => {
    const url = req.body.url;
    const serverUrl = req.get('Host');
    const shortenUrl = service.postUrl(url, serverUrl);
    if(shortenUrl) res.status(200).send(shortenUrl);
    res.status(400).send(`Bad request: url (${serverUrl}) is undefined or not valid.`)
}

exports.get_url = (req, res) => {
    const code = req.params.code;
    const serverUrl = req.get('Host');
    const url = service.getUrlOfShortenUrl(code, serverUrl);
    if(url) res.status(200).send(url);
    res.status(404).send(`Not found: urlDatabase does not contain ${serverUrl + '/' + code}.`)
}