const HttpError = require('../common/http_error');

module.exports = (req, res, next) => {
    const err = HttpError.NotFound('Not Found');
    return next(err);
};
