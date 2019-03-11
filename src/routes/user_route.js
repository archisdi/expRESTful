'use strict';

const router = require('express').Router();

const { profile } = require('../methods/users/profile');
const { ExpressLogicAdapter: Logic } = require('../common/utils');
const JWTAuth = require('../middlewares/request-handler/jwt_auth');

/** User Routes */
router.get('/profile', JWTAuth, Logic(profile));

module.exports = router;
