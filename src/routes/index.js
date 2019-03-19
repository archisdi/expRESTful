'use strict';

const AuthRoutes = require('../routes/auth_route');
const UserRoutes = require('../routes/user_route');

module.exports = (app) => {
    app.use('/auth', AuthRoutes);
    app.use('/user', UserRoutes);
};
