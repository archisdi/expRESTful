'use strict';

const { ExpressRequestInput } = require('../utils/express');
const validator = require('../utils/validator');

module.exports = schema => (req, res, next) => {
    const input = ExpressRequestInput(req);
    return validator(input, schema)
        .then((validated) => {
            req.query = validated.query;
            req.params = validated.params;
            req.body = validated.body;
            return next();
        })
        .catch(err => next(err));
};
