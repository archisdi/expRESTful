'use strict';

exports.sequelize = {
    connection_string: process.env.DB_CONNECTION_STRING,
    options: {
        dialect: 'mysql',
        logging: process.env.NODE_ENV === 'production' ? false : console.log, // eslint-disable-line
        pool: {
            min: 0,
            max: 5,
            idle: 10000,
            evict: 10000,
            acquire: 20000
        }
    }
};

exports.mongodb = {
    connection_string: process.env.MONGO_CONNECTION_STRING,
    options: {
        useNewUrlParser: true
    }
};

exports.redis = {
    connection_string: process.env.REDIS_CONNECTION_STRING,
    options: {

    }
};

module.exports = exports;
