const Response = require('../helpers/api_response');
const UserRepo = require('../repository/user_repo');
const bcrypt = require('bcryptjs');
const JWT = require('../helpers/jwt');
const Error = require('../helpers/error');

exports.login = async (req, res, next) => {
    try {
        const user = await UserRepo.findOne({ username: req.body.username });
        if (!user) return next(Error('Credentials not match', 401));

        const compare = await bcrypt.compare(req.body.password, user.password);
        if (!compare) return next(Error('Credentials not match', 401));

        const token = await JWT.create({
            id: user.id,
            username: user.username
        });

        const response = {
            token,
            refreshToken: null
        };

        return Response(res, 'login successfull', 200, response);
    } catch (err) {
        return next(Error(err.message))
    }
}

module.exports = exports;
