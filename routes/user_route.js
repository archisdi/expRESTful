const router = require('express').Router();
const UserController = require('../app/controllers/user_controller');

router.get('/profile', UserController.profile);

module.exports = router;
