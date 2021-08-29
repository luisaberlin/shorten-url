'use strict';
let urlDataset = {};
let code = 0;

exports.postUrl = function (url, serverUrl) {
    // If url already shortened -> return shorten url
    let shortenUrl = Object.keys(urlDataset).find(key => urlDataset[key] === url);
    if (shortenUrl) return shortenUrl;

    // If url not shortened yet -> generate new url
    shortenUrl = serverUrl + '/' + code;
    code++;

    // Add newly shorten url to urlDataset
    urlDataset[shortenUrl] = url;

    // Return newly shorten url
    return shortenUrl;
};

exports.getUrlOfShortenUrl = function (code, serverUrl) {
    const shortenUrl = serverUrl + '/' + code;

    // If shorten url is not in urlDataset return null
    if (!urlDataset[shortenUrl]) return undefined;

    // If shorten url is in urlDataset return long url
    return urlDataset[shortenUrl];
};
    
