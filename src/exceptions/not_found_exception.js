'use strict';

const { HttpError } = require('node-common');

module.exports = (req, res, next) => {
    const err = HttpError.NotFound('Not Found');
    return next(err);
};
