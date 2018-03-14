const Response = require('../helpers/api_response');
const UserRepo = require('../repositories/user_repo');
const Error = require('../helpers/error');

exports.profile = async (req, res, next) => {
    let user;
    try {
        user = await UserRepo.findOne({ id: req.user.id });
    } catch (err) {
        return next(Error(err.message));
    }
    const response = {
        name: user.name,
        username: user.username
    };
    return Response(res, 'successfully retrieved profile data', 200, response);
};

module.exports = exports;
