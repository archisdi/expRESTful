'use strict';

const { HttpError } = require('node-common');
const RateLimit = require('express-rate-limit');
const config = require('../../config/app');

module.exports = (max = config.rate.max, retry = config.rate.retry) => {
    const rateLimiter = new RateLimit({
        windowMs: retry,
        max,
        delayMs: 0,
        handler(req, res, next) {
            res.setHeader('Retry-After', Math.ceil(retry / 1000));
            return next(HttpError.TooManyRequests(`limit reach, try again in ${Math.ceil(retry / 1000)} seconds`, 429, {
                try_after: Math.ceil(retry / 1000)
            }));
        }
    });

    return rateLimiter;
};
