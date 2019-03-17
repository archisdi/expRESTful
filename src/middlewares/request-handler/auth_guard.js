const JWT = require('../../utils/jwt');
const HttpError = require('../../common/http_error');
const UserRepository = require('../../repositories/user_repo');
const parseDataObject = require('../../utils/helpers').parseDataObject;

const generateContext = async (payload) => {
    const UserRepo = new UserRepository();
    const user = await UserRepo.find(payload.uid);

    return parseDataObject({
        id: user.id,
        name: user.name
    });
};

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) throw HttpError.NotAuthorized('token not provided');
        try {
            const payload = await JWT.verify(token);
            req.auth = await generateContext(payload);
        } catch (err) {
            const message = err.message === 'jwt expired' ? 'Token Expired' : 'Invalid Token';
            throw HttpError.NotAuthorized(message);
        }
        return next();
    } catch (err) {
        return next(err);
    }
};
