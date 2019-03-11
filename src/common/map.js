const GMAPS = require('@google/maps');

let client;

exports.initialize = () => {
    client = GMAPS.createClient({
        key: process.env.GMAPS_APIKEY,
        Promise
    });
};

exports.getClient = () => {
    if (!client) exports.initialize();
    return client;
};

module.exports = exports;
