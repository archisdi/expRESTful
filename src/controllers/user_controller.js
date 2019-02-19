'use strict';

const { HttpResponse } = require('../utils/helpers');
const UserRepo = require('../repositories/user_repo');

exports.profile = async (req, res, next) => {
    try {
        const user = await UserRepo.findOne({ id: req.auth.id }, ['id', 'name', 'username']);
        const response = {
            name: user.name,
            username: user.username
        };
        return HttpResponse(res, 'successfully retrieved profile data', response);
    } catch (err) {
        return next(err);
    }
};

module.exports = exports;
