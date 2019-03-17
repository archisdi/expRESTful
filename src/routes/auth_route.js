'use strict';

const router = require('express').Router();

const { login, logout, refresh } = require('../methods/authentication');
const { ExpressLogicAdapter: Logic } = require('../common/utils');

const AuthRequest = require('../middlewares/request-validator/auth_request');
const AuthGuard = require('../middlewares/request-handler/auth_guard');

/** Auth Routes */
router.post('/login', AuthRequest('login'), Logic(login));
router.post('/logout', AuthGuard, Logic(logout));
router.post('/refresh', AuthRequest('refresh'), Logic(refresh));

module.exports = router;
