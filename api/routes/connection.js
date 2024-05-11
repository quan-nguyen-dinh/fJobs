const express = require('express');
const router = express.Router();

const ConnectionController = require('../controller/ConnectionController');

router.get('/request/:userId', ConnectionController.getRequest);
router.post('/request', ConnectionController.request);
router.post('/request/accept', ConnectionController.accept);
router.get('/all/:userId', ConnectionController.show);
// router.get('/:postId', PostController.detail);
// router.get('/comments/:postId', PostController.comments);
module.exports = router;