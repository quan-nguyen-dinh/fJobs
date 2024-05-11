const express = require('express');
const router = express.Router();

const MessageController = require('../controller/MessageController');

router.get('/all', MessageController.show);
// router.get('/:postId', PostController.detail);
// router.get('/comments/:postId', PostController.comments);
// router.post('/comment/:slug', PostController.updateComment)
module.exports = router;