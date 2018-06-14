const Joi = require('joi');
const Input = require('../utils/request_input');
const Error = require('../utils/error');

module.exports = async (req, res, next) => {
    const input = Input(req);
    await Joi.validate(input, req.schema, { stripUnknown: true, abortEarly: false })
        .then((validated) => {
            req.query = validated.query;
            req.params = validated.params;
            req.body = validated.body;
            return next();
        })
        .catch((err) => {
            const details = err.details.reduce((detail, item) => {
                detail[item.context.key] = item.message.replace(/"/g, '');
                return detail;
            }, {});
            return next(Error('validation error', 422, details));
        });
};
