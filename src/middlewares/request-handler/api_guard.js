const config = require('../../config/app');
const HttpError = require('../../utils/http_error');

module.exports = (req, res, next) => {
    if (req.query.secret !== config.apiKey && req.headers.secret !== config.apiKey) {
        return next(HttpError.NotAuthorized('Not Authorized'));
    }
    return next();
};
