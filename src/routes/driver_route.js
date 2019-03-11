'use strict';

const router = require('express').Router();

const { login, logout, refresh } = require('../methods/driver/authentication');
const { ExpressLogicAdapter: Logic } = require('../common/utils');

const AuthRequest = require('../middlewares/request-validator/auth_request');
const JWTAuth = require('../middlewares/request-handler/jwt_auth');

/** Auth Routes */
router.post('/login', AuthRequest('login'), Logic(login));
router.post('/logout', JWTAuth, Logic(logout));
router.post('/refresh', AuthRequest('refresh'), Logic(refresh));

module.exports = router;
