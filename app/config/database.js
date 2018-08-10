exports.sequelize = {
    table: process.env.DB_NAME || '',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    options: {
        port: process.env.DB_PORT || '3306',
        dialect: process.env.DB_DIALECT || 'mysql',
        host: process.env.DB_HOST || '127.0.0.1',
        logging: process.env.APP_DEBUG === 'true' ? console.log : false, //eslint-disable-line
        operatorsAliases: false
    }
};

exports.mongodb = {

};

module.exports = exports;
