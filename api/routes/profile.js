const express = require('express');
const router = express.Router();

const profileController = require('../controller/ProfileController');

router.get('/:userId', profileController.show);
router.put('/:userId', profileController.update);

module.exports = router;