const JWT = require('../helpers/jwt');
const Error = require('../helpers/error');

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) return next(Error('Token Not Provided', 401));

    try {
        req.user = await JWT.verify(token);
    } catch (err) {
        return next(Error('Invalid Token', 401));
    }

    return next();
}