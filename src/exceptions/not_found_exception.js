'use strict';

const { HttpError } = require('tymon');

module.exports = (req, res, next) => {
    const err = HttpError.NotFound('Not Found');
    return next(err);
};
