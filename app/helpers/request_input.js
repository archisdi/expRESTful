module.exports = req => {
    return {
        query: req.query,
        params: req.params,
        body: req.body
    }
}