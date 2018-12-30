module.exports = (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    return next(err);
};
