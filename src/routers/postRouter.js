const express = require('express');
const { postController } = require('../controllers');
const auth = require('../middlewares/auth/auth');

const router = express.Router();

// '/post'
router.get('/', auth, postController.getPosts);
router.post('/', auth, postController.createPost);

module.exports = router;