const config = require('../../config/app');
const { Exception } = require('../../utils/helpers');

module.exports = (req, res, next) => {
    if (req.query.secret !== config.apiKey && req.headers.secret !== config.apiKey) {
        return next(Exception('Not Authorized', 401));
    }
    return next();
};
