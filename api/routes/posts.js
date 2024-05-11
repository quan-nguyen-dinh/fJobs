const express = require('express');
const router = express.Router();

const PostController = require('../controller/PostController');

router.get('/all', PostController.show);
router.get('/:postId', PostController.detail);
router.get('/like/:postId', PostController.like);
router.get('/comments/:postId', PostController.comments);
router.post('/comment/:slug', PostController.updateComment)
module.exports = router;