const Joi = require('joi');
const Input = require('../helpers/request_input');
const Error = require('../helpers/error');

module.exports = async (req, res, next) => {
    const input = Input(req);
    const validated = await Joi.validate(input, req.schema, { stripUnknown: true, abortEarly: false })
        .catch(err => {
            return next(Error('validation error', 422, err.details));
        });

    req.query = validated.query;
    req.params = validated.params;
    req.body = validated.body;

    return next();
}
