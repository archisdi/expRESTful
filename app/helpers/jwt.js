const JWT = require('jsonwebtoken');
const config = require('../../config/jwt');

exports.create = (credentials) => {
    return JWT.sign(credentials, config.secret, {
        expiresIn: config.expired
    });
}

exports.verify = async token => {
    return await JWT.verify(token, config.secret);
}

module.exports = exports;
