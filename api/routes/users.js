const express = require('express');
const router = express.Router();

const UserController = require('../controller/UserController');

router.get('/:userId', UserController.show);

module.exports = router;