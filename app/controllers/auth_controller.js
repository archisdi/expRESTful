const Response = require('../utils/api_response');
const UserRepo = require('../repositories/user_repo');
const JWT = require('../utils/jwt');
const Error = require('../utils/error');
const UserTransformer = require('../utils/transformers/user_transformer');

exports.login = async (req, res, next) => {
    try {
        const user = await UserRepo.findOneWithFullCredential({ username: req.body.username });
        if (!user) return next(Error('Credentials not match', 401));
        if (!user.validateAuth(req.body.password)) return next(Error('Credentials not match', 401));

        const token = await JWT.create(UserTransformer(user));

        const refresh = await JWT.generateRefreshToken();

        await user.update({ refreshToken: refresh.token, tokenValidity: refresh.validity });

        const response = {
            token,
            refresh_token: refresh.token
        };

        return Response(res, 'login successful', 200, response);
    } catch (err) {
        return next(Error(err.message));
    }
};

exports.logout = async (req, res, next) => {
    try {
        const user = await UserRepo.findOneWithFullCredential({ id: req.user.id, username: req.user.username });
        if (!user) return next(Error('Not Authorized', 401));

        await user.update({ refreshToken: null, tokenValidity: null });

        return Response(res, 'invalidate refresh token successful', 200);
    } catch (err) {
        return next(Error(err.message));
    }
};

exports.refresh = async (req, res, next) => {
    try {
        const user = await UserRepo.findOneWithFullCredential({ refreshToken: req.body.refresh_token });
        if (!user) return next(Error('Not Authorized', 401));
        if (!user.validateRefresh()) {
            await user.update({ refreshToken: null, tokenValidity: null });
            return next(Error('Refresh Token Expired', 401));
        }

        const token = await JWT.create({
            id: user.id,
            username: user.username
        });

        const response = {
            new_token: token
        };

        return Response(res, 'refresh token successful', 200, response);
    } catch (err) {
        return next(Error(err.message));
    }
};

module.exports = exports;
