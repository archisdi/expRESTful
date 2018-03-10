const JWT = require('jsonwebtoken');
const config = require('../../config/jwt');

exports.create = credentials => JWT.sign(credentials, config.secret, { expiresIn: config.expired });

exports.verify = token => JWT.verify(token, config.secret);

module.exports = exports;
