const express = require('express');
const router = express.Router();

const MessageController = require('../controller/MessageController');

router.get('/all', MessageController.show);
router.get('/:senderId/:recepientId', MessageController.getMessageByRecepient);
// router.get('/comments/:postId', PostController.comments);
router.post('/chat', MessageController.chat)
module.exports = router;