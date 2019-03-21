'use strict';

const router = require('express').Router();

const { profile } = require('../methods/users');
const { ExpressLogicAdapter: Logic } = require('../utils/libs/express');
const AuthGuard = require('../middlewares/auth_guard');

/** User Routes */
router.get('/profile', AuthGuard, Logic(profile));

module.exports = router;
