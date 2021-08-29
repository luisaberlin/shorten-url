'use strict';
const Url = require('./model');

exports.postUrl = async function (url, serverUrl) {
    // Return null if url is undefined or not valid
    if (!url) return null;
    if (!validURL(url)) return null;

    // If url already shortened -> return shorten url
    const dbUrl = await Url.findOne({ url: url }).exec();
    if (dbUrl) return dbUrl.shortenUrl;

    // If url not shortened yet -> generate new short url
    const code = await getUniqueCode();
    const shortenUrl = serverUrl + '/' + code;

    // Add newly shorten url to urlDataset
    let newUrl = new Url({ url: url, shortenUrl: shortenUrl, code: code});
    newUrl = await newUrl.save();

    return newUrl.shortenUrl;
};

exports.getUrlOfShortenUrl = async function (code, serverUrl) {
    const shortenUrl = serverUrl + '/' + code;

    // Get url by short url from db
    const dbUrl = await Url.findOne({ shortenUrl: shortenUrl }).exec();

    // If shorten url is not in urlDataset return undefined
    if (!dbUrl) return undefined;

    // If shorten url is in urlDataset return long url
    return dbUrl.url;
};

exports.getAll = async function () {
    return await Url.find({}).exec();
};

exports.deleteAll = async function () {
    return await Url.remove({});
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

/**
 * Return date in milliseconds as code, but checks if it is already used (which is really unlikly)
 * @returns unique code
 */
 async function getUniqueCode(){
    let date = Date.now(); // Returns something like 1576986323459
    while(true){
        const dbUrl = await Url.findOne({ code: date }).exec();
        if(!dbUrl) break;
        date = Date.now();
    }
    return date;
}
