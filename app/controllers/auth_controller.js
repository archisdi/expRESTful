const { apiResponse, customError } = require('../utils/helpers');
const UserRepo = require('../repositories/user_repo');
const JWT = require('../utils/jwt');
const UserTransformer = require('../utils/transformers/user_transformer');
const Config = require('../config/jwt');

exports.login = async (req, res, next) => {
    try {
        const user = await UserRepo.findOne({ username: req.body.username });
        if (!user) return next(customError('Credentials not match', 401));
        if (!user.validateAuth(req.body.password)) return next(customError('Credentials not match', 401));

        const token = await JWT.create(UserTransformer(user));

        const refresh = await JWT.generateRefreshToken();

        await user.update({ refreshToken: refresh.token, tokenValidity: refresh.validity });

        const response = {
            token,
            refresh_token: refresh.token,
            expires_in: Config.expired
        };

        return apiResponse(res, 'login successful', 200, response);
    } catch (err) {
        return next(customError(err.message));
    }
};

exports.logout = async (req, res, next) => {
    try {
        const user = await UserRepo.findOne({ id: req.user.id, username: req.user.username });
        if (!user) return next(customError('Not Authorized', 401));

        await user.update({ refreshToken: null, tokenValidity: null });

        return apiResponse(res, 'invalidate refresh token successful', 200);
    } catch (err) {
        return next(customError(err.message));
    }
};

exports.refresh = async (req, res, next) => {
    try {
        const user = await UserRepo.findOne({ refreshToken: req.body.refresh_token });
        if (!user) return next(customError('Not Authorized', 401));
        if (!user.validateRefresh()) {
            await user.update({ refreshToken: null, tokenValidity: null });
            return next(customError('Refresh Token Expired', 401));
        }

        const token = await JWT.create({
            id: user.id,
            username: user.username
        });

        const response = {
            new_token: token
        };

        return apiResponse(res, 'refresh token successful', 200, response);
    } catch (err) {
        return next(customError(err.message));
    }
};

module.exports = exports;
