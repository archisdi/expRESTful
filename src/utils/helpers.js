exports.apiResponse = (res, message, status = 200, content = null) => res.status(status).json({
    message,
    status,
    content
});

exports.requestInput = req => ({
    query: req.query || null,
    params: req.params || null,
    body: req.body || null
});

module.exports = exports;
