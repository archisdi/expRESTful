'use strict';

const router = require('express').Router();

const { login, logout, refresh } = require('../methods/authentication');
const { ExpressLogicAdapter: Logic } = require('../common/utils');

const Validator = require('../middlewares/validator');
const AuthGuard = require('../middlewares/auth_guard');

/** Auth Routes */
router.post('/login', Validator('login'), Logic(login));
router.post('/logout', AuthGuard, Logic(logout));
router.post('/refresh', Validator('refresh'), Logic(refresh));

module.exports = router;
