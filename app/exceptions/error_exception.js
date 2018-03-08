const config = require('../../config/app');

module.exports = (err, req, res, next) => {
    let { message, status = 500, stack, detail = undefined } = err;
    try {
        stack = config.debug ? err.stack.split('\n').map(item => item.trim()) : undefined;
    } catch (err) {
        stack = undefined;
    }
    return res.status(status).json({
        message,
        status,
        detail,
        stack
    });
}