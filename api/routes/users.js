const express = require('express');
const router = express.Router();

const UserController = require('../controller/UserController');

router.get('/:userId', UserController.show);
router.get('/info/:userId', UserController.getInfo);
module.exports = router;