const RateLimit = require('express-rate-limit');
const config = require('../config/app');
const Error = require('../utils/error');

module.exports = (max = config.rate.max, retry = config.rate.retry) => {
    const rateLimiter = new RateLimit({
        windowMs: retry,
        max,
        delayMs: 0,
        handler(req, res, next) {
            res.setHeader('Retry-After', Math.ceil(retry / 1000));
            return next(Error(`limit reach, try again in ${Math.ceil(retry / 1000)} seconds`, 429));
        }
    });

    return rateLimiter;
};
