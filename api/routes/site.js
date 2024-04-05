const express = require('express');
const router = express.Router();

const SiteController = require('../controller/SiteController');

router.get('/verify/:token', SiteController.verify);
router.post('/register', SiteController.register);
router.post('/login', SiteController.login)

module.exports = router;