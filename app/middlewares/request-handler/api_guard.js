const config = require('../../config/app');
const { customError } = require('../../utils/helpers');

module.exports = (req, res, next) => {
    if (req.query.secret !== config.apiKey && req.headers.secret !== config.apiKey) {
        return next(customError('Not Authorized', 401));
    }
    return next();
};
