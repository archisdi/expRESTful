const JWT = require('../../utils/jwt');
const Error = require('../../utils/error');

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return next(Error('Token Not Provided', 401));
    try {
        req.user = await JWT.verify(token);
    } catch (err) {
        const message = err.message === 'jwt expired' ? 'Token Expired' : 'Invalid Token';
        return next(Error(message, 401));
    }
    return next();
};
