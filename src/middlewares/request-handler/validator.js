const Joi = require('joi');
const { requestInput } = require('../../utils/helpers');
const HttpError = require('../../common/http_error');

module.exports = (schema, options = { stripUnknown: true, abortEarly: false }) => (req, res, next) => {
    const input = requestInput(req);
    return Joi.validate(input, schema, options)
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
            return next(HttpError.UnprocessableEntity('validation error', details));
        });
};
