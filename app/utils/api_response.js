module.exports = (res, message, status = 200, content = null) => res.status(status).json({
    message,
    status,
    content
});
