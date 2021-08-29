'use strict';
let urlDataset = {};
let code = 0;

exports.postUrl = function (url, serverUrl) {
    // Return null if url is undefined or not valid
    if (!url) return null;
    if (!validURL(url)) return null;

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

/**
 * Check if string is an valid url
 * Credits: https://stackoverflow.com/a/5717133
 * @param {*} str 
 * @returns 
 */
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}
    
