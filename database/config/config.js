require('dotenv').config({ path: '../.env' });

const envs = ['development', 'test', 'production'];

const configs = envs.reduce((acc, env) => {
    acc[env] = {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    };
    return acc;
}, {});

module.exports = configs;
