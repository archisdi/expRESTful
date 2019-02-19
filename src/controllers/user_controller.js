'use strict';

const { MongoContext } = require('../common');
const { HttpResponse } = require('../utils/helpers');
const UserRepo = require('../repositories/user_repo');
const LogRepo = require('../repositories/log_repo');

exports.profile = async (req, res, next) => {
    try {
        await MongoContext.startSession();

        /** Example of SQL use */
        const user = await UserRepo.findOne({ id: req.auth.id }, ['id', 'name', 'username']);

        /** Example of mongo use */
        await LogRepo.create({ action: 'view_profile' });

        await MongoContext.commit();

        return HttpResponse(res, 'successfully retrieved profile data', {
            name: user.name,
            username: user.username
        });
    } catch (err) {
        return next(err);
    }
};

module.exports = exports;
