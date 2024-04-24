const express = require('express');
const router = express.Router();

const ProfileController = require('../controller/ProfileController');

router.get('/:userId', ProfileController.show);
router.put('/:userId', ProfileController.update);

module.exports = router;