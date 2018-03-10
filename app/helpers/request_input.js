module.exports = (req) => {
    const input = {
        query: req.query,
        params: req.params,
        body: req.body
    };
    return input;
};
