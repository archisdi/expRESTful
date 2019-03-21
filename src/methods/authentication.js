'use strict';

const { HttpError, JobWorker } = require('node-common');
const Repository = require('../repositories');
const JWT = require('../utils/libs/jwt');
const Config = require('../config/jwt');

/**
 * @description authenticate and assign a token to given user
 * @method POST
 */
exports.login = async (data, context) => {
    try {
        const Repo = new Repository();

        const user = await Repo.get('user').findOne({ username: data.body.username });
        if (!user) throw HttpError.NotAuthorized('credentials not match');
        if (!user.validateAuth(data.body.password)) throw HttpError.NotAuthorized('credentials not match');

        const token = await JWT.create({ uid: user.id });
        const refresh = await JWT.generateRefreshToken();

        await Repo.get('user').update(
            { id: user.id },
            { refresh_token: refresh.token, token_validity: refresh.validity }
        );

        const response = {
            token,
            refresh_token: refresh.token,
            expires_in: Config.expired
        };

        /** Dispatch async job */
        await JobWorker.dispatch('log-user-login', user);

        return {
            message: 'login successful',
            data: response
        };
    } catch (err) {
        if (err.status) throw err;
        throw HttpError.InternalServerError(err.message);
    }
};

/**
 * @description removes given user refresh token from database
 * @method POST
 */
exports.logout = async (data, context) => {
    try {
        const Repo = new Repository();

        const user = await Repo.get('user').find(context.id);
        if (!user) throw HttpError.NotAuthorized('already logged out');

        await Repo.get('user').update({ id: user.id }, { refresh_token: null, token_validity: null });

        return {
            message: 'invalidate refresh token successful'
        };
    } catch (err) {
        if (err.status) throw err;
        throw HttpError.InternalServerError(err.message);
    }
};

/**
 * @description reassign a new token to given user from a refresh token
 */
exports.refresh = async (data, context) => {
    try {
        const Repo = new Repository();

        const user = await Repo.get('user').findOne({ refresh_token: data.body.refresh_token });
        if (!user) throw HttpError.NotAuthorized('not logged in');

        if (!user.validateRefresh()) {
            await Repo.get('user').update({ id: user.id }, { refresh_token: null, token_validity: null });
            throw HttpError.NotAuthorized('refresh token expired');
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
