module.exports = (res, message, status = 200, content = null) => {
    return res.status(status).json({
        message,
        status,
        content
    });
};
