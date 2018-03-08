exports.sql = {
    table: process.env.DB_TABLE,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || '3306',
    dialect: 'mysql',
    logging: process.env.DB_LOG === 'true' ? true : false || false
};

exports.mongo = {

};

module.exports = exports;

