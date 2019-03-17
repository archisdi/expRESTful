'use strict';

const HttpError = require('../common/http_error');
const Repository = require('../repositories');
const JWT = require('../utils/jwt');
const Config = require('../config/jwt');
const UserTransformer = require('../utils/transformers/user_transformer');

exports.login = async (data, context) => {
    try {
        const Repo = new Repository();

        const user = await Repo.get('user').findOne({ username: data.body.username });
        if (!user) throw HttpError.NotAuthorized('Credentials not match');
        if (!user.validateAuth(data.body.password)) throw HttpError.NotAuthorized('Credentials not match');

        const token = await JWT.create(UserTransformer(user));
        const refresh = await JWT.generateRefreshToken();

        await user.update({ refreshToken: refresh.token, tokenValidity: refresh.validity });

        const response = {
            token,
            refresh_token: refresh.token,
            expires_in: Config.expired
        };

        return {
            message: 'login successful',
            data: response
        };
    } catch (err) {
        if (err.status) throw err;
        throw HttpError.InternalServerError(err.message);
    }
};

exports.logout = async (data, context) => {
    try {
        const Repo = new Repository();

        const user = await Repo.get('user').find(context.id);
        if (!user) throw HttpError.NotAuthorized('Already logged out');

        await user.update({ refreshToken: null, tokenValidity: null });

        return {
            message: 'invalidate refresh token successful'
        };
    } catch (err) {
        if (err.status) throw err;
        throw HttpError.InternalServerError(err.message);
    }
};

exports.refresh = async (data, context) => {
    try {
        const Repo = new Repository();

        const user = await Repo.get('user').findOne({ refreshToken: data.body.refresh_token });
        if (!user) throw HttpError.NotAuthorized('Not logged in');

        if (!user.validateRefresh()) {
            await user.update({ refreshToken: null, tokenValidity: null });
            throw HttpError.NotAuthorized('Refresh Token Expired');
        }

        const token = await JWT.create({
            id: user.id,
            username: user.username
        });

        return {
            message: 'refresh token successfull',
            data: {
                new_token: token
            }
        };
    } catch (err) {
        if (err.status) throw err;
        throw HttpError.InternalServerError(err.message);
    }
};

module.exports = exports;
