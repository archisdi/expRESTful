const { apiResponse, customError } = require('../utils/helpers');
const UserRepo = require('../repositories/user_repo');

exports.profile = async (req, res, next) => {
    let user;
    try {
        user = await UserRepo.findOne({ id: req.user.id }, ['id', 'name', 'username']);
    } catch (err) {
        return next(customError(err.message));
    }
    const response = {
        name: user.name,
        username: user.username
    };
    return apiResponse(res, 'successfully retrieved profile data', 200, response);
};

module.exports = exports;
