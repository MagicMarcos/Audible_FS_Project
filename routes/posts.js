const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const postsController = require('../controllers/posts');
const commentsController = require('../controllers/comment');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

//Post Routes
// TODO: make sure to ensure auth here
router.get('/:id', postsController.getPost);

router.post('/makepost', upload.single('file'), postsController.createPost);

router.post('/:postId', commentsController.comment);

router.delete('/deletePost/:id', postsController.deletePost);

module.exports = router;
