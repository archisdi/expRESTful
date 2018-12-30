const ErrorException = require('./error_exception');
const NotFoundException = require('./not_found_exception');

module.exports = (app) => {
    app.use(NotFoundException);
    app.use(ErrorException);
};
