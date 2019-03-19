'use strict';

const { HttpError } = require('node-common');
const Repository = require('../repositories');
const Transformer = require('../utils/transformers/user_transformer');

/**
 * @description retrieve user profile
 * @method GET
 */
exports.profile = async (data, context) => {
    try {
        const Repo = new Repository();
        const user = await Repo.get('user').find(context.id);

        return {
            message: 'user profile retrieved',
            data: Transformer(user)
        };
    } catch (err) {
        if (err.status) throw err;
        throw HttpError.InternalServerError(err.message);
    }
};

module.exports = exports;
