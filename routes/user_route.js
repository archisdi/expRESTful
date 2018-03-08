const router = require('express').Router();
const response = require('../app/helpers/api_response');
const UserController = require('../app/controllers/user_controller');

router.get('/profile', UserController.profile);

module.exports = router;
