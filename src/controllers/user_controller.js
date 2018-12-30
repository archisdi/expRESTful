'use strict';

const { apiResponse } = require('../utils/helpers');
const UserRepo = require('../repositories/user_repo');

exports.profile = async (req, res, next) => {
    try {
        const user = await UserRepo.findOne({ id: req.user.id }, ['id', 'name', 'username']);
        const response = {
            name: user.name,
            username: user.username
        };
        return apiResponse(res, 'successfully retrieved profile data', 200, response);
    } catch (err) {
        return next(err);
    }
};

module.exports = exports;
