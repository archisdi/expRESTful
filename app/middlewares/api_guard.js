const config = require('../config/app');
const Error = require('../utils/error');

module.exports = (req, res, next) => {
    if (req.query.secret !== config.apiKey && req.headers.secret !== config.apiKey) {
        return next(Error('Not Authorized', 401));
    }

    return next();
};
