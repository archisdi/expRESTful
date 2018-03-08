const router = require('express').Router();
const response = require('../app/helpers/api_response');
const AuthController = require('../app/controllers/auth_controller');

router.post('/login', AuthController.login);

module.exports = router;
