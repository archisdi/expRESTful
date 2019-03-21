'use strict';

const router = require('express').Router();

const { login, logout, refresh } = require('../methods/authentication');
const { ExpressLogicAdapter: Logic } = require('../utils/libs/express');

const Validator = require('../middlewares/request_validator');
const AuthGuard = require('../middlewares/auth_guard');

/** Auth Routes */
router.post('/login', Validator('login'), Logic(login));
router.post('/logout', AuthGuard, Logic(logout));
router.post('/refresh', Validator('refresh'), Logic(refresh));

module.exports = router;
