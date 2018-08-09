exports.sequelize = {
    table: process.env.DB_NAME,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || '3306',
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: process.env.DB_LOG === 'true' ? console.log : false || false,
    operatorsAliases: false
};

exports.mongodb = {

};

module.exports = exports;

