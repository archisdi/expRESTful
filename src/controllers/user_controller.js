'use strict';

const { HttpResponse } = require('../utils/helpers');
const UserRepository = require('../repositories/user_repo');
const LogRepository = require('../repositories/log_repo');

exports.profile = async (req, res, next) => {
    try {
        const UserRepo = new UserRepository();
        const LogRepo = new LogRepository();

        /** Example of SQL use */
        const user = await UserRepo.findOne({ id: req.auth.id }, ['id', 'name', 'username']);

        /** Example of mongo use */
        await LogRepo.create({ action: 'view_profile' });

        return HttpResponse(res, 'successfully retrieved profile data', {
            name: user.name,
            username: user.username
        });
    } catch (err) {
        return next(err);
    }
};

module.exports = exports;
