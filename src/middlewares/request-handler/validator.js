const Joi = require('joi');
const { Utils: { ExpressRequestInput: requestInput } } = require('../../common');
const HttpError = require('../../common/http_error');

const defaultOptions = {
    stripUnknown: {
        arrays: false,
        objects: true
    },
    abortEarly: false
};

module.exports = (schema, options = defaultOptions) => (req, res, next) => {
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
