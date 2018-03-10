const router = require('express').Router();
const AuthController = require('../app/controllers/auth_controller');
const AuthRequest = require('../app/requests/auth_request');
const JWTAuth = require('../app/middleware/jwt_auth');

router.post('/login', AuthRequest('login'), AuthController.login);
router.post('/logout', JWTAuth, AuthController.logout);
router.post('/refresh', AuthRequest('refresh'), AuthController.refresh);

module.exports = router;
