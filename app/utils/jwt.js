const JWT = require('jsonwebtoken');
const RandomString = require('randomstring');
const Moment = require('moment');
const Config = require('../config/jwt');

exports.create = async credentials => JWT.sign(credentials, Config.secret, { expiresIn: Config.expired });

exports.verify = async token => JWT.verify(token, Config.secret);

exports.generateRefreshToken = async () => ({
    token: RandomString.generate({ length: 50 }),
    validity: Moment().add(Config.refresh_token_expired, 'seconds')
});

module.exports = exports;
