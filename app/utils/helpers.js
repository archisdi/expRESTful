exports.apiResponse = (res, message, status = 200, content = null) => res.status(status).json({
    message,
    status,
    content
});

exports.customError = (message, status = 500, detail = null) => {
    const err = new Error(message);
    err.status = status;
    if (detail) err.detail = detail;
    return err;
};

exports.requestInput = req => ({
    query: req.query || null,
    params: req.params || null,
    body: req.body || null
});

module.exports = exports;
