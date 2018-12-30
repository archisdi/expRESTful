const config = require('../config/app');
const HttpError = require('../utils/http_error');

module.exports = (err, req, res, next) => {
    const errorInstance = err.status ? err : HttpError.InternalServerError(err.message);
    const {
        status = 500,
        user_message: userMessage = 'something went wrong',
        message_detail: messageDetail
    } = errorInstance;

    let stack = err.stack;
    stack = stack && config.debug ? err.stack.split('\n').map(item => item.trim()) : undefined;

    return res.status(status).json({
        status,
        message: userMessage,
        detail: messageDetail,
        stack
    });
};
