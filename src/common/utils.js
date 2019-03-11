exports.ExpressHttpResponse = (res, message, content = null, status = 200) => res.status(status).json({
    message,
    status,
    content
});

exports.ExpressRequestInput = req => ({
    query: req.query || null,
    params: req.params || null,
    body: req.body || null
});

exports.ExpressLogicAdapter = method => async (req, res, next) => {
    try {
        const data = exports.ExpressRequestInput(req);
        const context = req && req.auth ? req.auth : null;

        const {
            message = 'success', data: outData = {}
        } = await method(data, context);

        return exports.ExpressHttpResponse(res, message, outData);
    } catch (err) {
        return next(err);
    }
};

module.exports = exports;
