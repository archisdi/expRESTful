const router = require('express').Router();
const { login, logout, refresh } = require('../controllers/auth_controller');
const AuthRequest = require('../middlewares/request-validator/auth_request');
const JWTAuth = require('../middlewares/request-handler/jwt_auth');

router.post('/login', AuthRequest('login'), login);
router.post('/logout', JWTAuth, logout);
router.post('/refresh', AuthRequest('refresh'), refresh);

module.exports = router;
