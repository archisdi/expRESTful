const router = require('express').Router();
const AuthController = require('../app/controllers/auth_controller');
const AuthRequest = require('../app/requests/auth_request');

router.post('/login', AuthRequest('login'), AuthController.login);

module.exports = router;
