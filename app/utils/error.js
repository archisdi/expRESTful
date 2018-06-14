module.exports = (message, status = 500, detail = null) => {
    const err = new Error(message);
    err.status = status;
    if (detail) err.detail = detail;
    return err;
};
