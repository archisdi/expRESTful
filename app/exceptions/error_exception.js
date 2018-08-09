const config = require('../config/app');

module.exports = (err, req, res, next) => {
    const {
        message,
        status = 500,
        detail = undefined
    } = err;

    let stack = err.stack;
    stack = stack && config.debug ? err.stack.split('\n').map(item => item.trim()) : undefined;

    return res.status(status).json({
        message,
        status,
        detail,
        stack
    });
};
