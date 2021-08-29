'use strict';
const service = require('./service');

exports.post_url = async (req, res) => {
    const url = req.body.url;
    const serverUrl = req.get('Host');
    try{
        const shortenUrl = await service.postUrl(url, serverUrl);
        if(shortenUrl) {
            res.status(200).send(shortenUrl);
        } else {
            res.status(400).send(`Bad request: url is undefined or not valid.`)
        }
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.get_url = async (req, res) => {
    const code = req.params.code;
    const serverUrl = req.get('Host');
    try {
        const url = await service.getUrlOfShortenUrl(code, serverUrl);
        if(url) {
            res.redirect(url);
        } else {
            res.status(404).send(`Not found: urlDatabase does not contain ${serverUrl + '/' + code}.`)
        }
    } catch(e) {
        res.status(400).send(e);
    }
}

exports.get_all = async (req, res) => {
    try {
        const urls = await service.getAll();
        if(urls) res.status(200).send(urls);
    } catch(e) {
        res.status(400).send(e);
    }
}

exports.delete_all = async (req, res) => {
    try {
        await service.deleteAll();
        res.status(200).send();
    } catch(e) {
        res.status(400).send(e);
    }
}