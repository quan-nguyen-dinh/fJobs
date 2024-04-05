const express = require('express');
const router = express.Router();

const PostController = require('../controller/PostController');

router.get('/:postId', PostController.show);

module.exports = router;