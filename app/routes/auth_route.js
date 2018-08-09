const router = require('express').Router();
const AuthController = require('../controllers/auth_controller');
const AuthRequest = require('../middlewares/request-validator/auth_request');
const JWTAuth = require('../middlewares/request-handler/jwt_auth');

router.post('/login', AuthRequest('login'), AuthController.login);
router.post('/logout', JWTAuth, AuthController.logout);
router.post('/refresh', AuthRequest('refresh'), AuthController.refresh);

module.exports = router;
