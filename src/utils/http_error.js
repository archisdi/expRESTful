const errors = [
    { name: 'BadRequest', statusCode: 400, message: 'Bad Request' },
    { name: 'NotAuthorized', statusCode: 401, message: 'Not Authorized' },
    { name: 'Forbidden', statusCode: 403, message: 'Forbidden' },
    { name: 'NotFound', statusCode: 404, message: 'Not Found' },
    { name: 'UnprocessableEntity', statusCode: 422, message: 'Unprocessable Entity' },
    { name: 'TooManyRequests', statusCode: 429, message: 'Too Many Requests' },
    { name: 'InternalServerError', statusCode: 500, message: 'Internal Server Error' }
];

exports.initialize = () => {
    errors.forEach((e) => {
        exports[e.name] = (userMessage, messageDetail) => {
            const err = new Error(e.message);
            err.status = e.statusCode;
            err.user_message = userMessage;
            if (messageDetail) err.message_detail = messageDetail;
            return err;
        };
    });
};

module.exports = exports;
