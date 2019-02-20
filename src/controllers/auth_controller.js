'use strict';

const { HttpResponse } = require('../utils/helpers');
const HttpError = require('../common/http_error');
const UserRepository = require('../repositories/user_repo');
const JWT = require('../utils/jwt');
const Config = require('../config/jwt');
const UserTransformer = require('../utils/transformers/user_transformer');

exports.login = async (req, res, next) => {
    try {
        const UserRepo = new UserRepository();
        const user = await UserRepo.findOne({ username: req.body.username });
        if (!user) throw HttpError.NotAuthorized('Credentials not match');
        if (!user.validateAuth(req.body.password)) throw HttpError.NotAuthorized('Credentials not match');

        const token = await JWT.create(UserTransformer(user));
        const refresh = await JWT.generateRefreshToken();

        await user.update({ refreshToken: refresh.token, tokenValidity: refresh.validity });

        const response = {
            token,
            refresh_token: refresh.token,
            expires_in: Config.expired
        };

        return HttpResponse(res, 'login successful', response);
    } catch (err) {
        return next(err);
    }
};

exports.logout = async (req, res, next) => {
    try {
        const UserRepo = new UserRepository();
        const user = await UserRepo.findOne({ id: req.user.id, username: req.user.username });
        if (!user) throw HttpError.NotAuthorized('Already logged out');

        await user.update({ refreshToken: null, tokenValidity: null });

        return HttpResponse(res, 'invalidate refresh token successful');
    } catch (err) {
        return next(err);
    }
};

exports.refresh = async (req, res, next) => {
    try {
        const UserRepo = new UserRepository();
        const user = await UserRepo.findOne({ refreshToken: req.body.refresh_token });
        if (!user) throw HttpError.NotAuthorized('Not logged in');

        if (!user.validateRefresh()) {
            await user.update({ refreshToken: null, tokenValidity: null });
            throw HttpError.NotAuthorized('Refresh Token Expired');
        }

        const token = await JWT.create({
            id: user.id,
            username: user.username
        });

        const response = {
            new_token: token
        };

        return HttpResponse(res, 'refresh token successful', response);
    } catch (err) {
        return next(err);
    }
};

module.exports = exports;
