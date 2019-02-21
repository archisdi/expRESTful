const router = require('express').Router();
const { profile } = require('../controllers/user_controller');

router.get('/profile', profile);

module.exports = router;
