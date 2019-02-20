const Redis = require('ioredis');

const { redis: config } = require('../config/database');

let instance;

exports.initialize = () => {
    instance = new Redis(config.connection_string);
};

exports.getInstance = async () => {
    if (!instance) await exports.initialize();
    return instance;
};

module.exports = exports;
