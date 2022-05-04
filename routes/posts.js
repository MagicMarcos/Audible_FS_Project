import express from 'express';
import { multerUploadConfig as upload } from '../middleware/multer.js';

import { getPost, createPost, deletePost } from '../controllers/posts.js';
import { comment } from '../controllers/comment.js';
import { ensureAuth } from '../middleware/auth.js';

const router = express.Router();

//Post Routes
// TODO: make sure to ensure auth here
router.get('/:id', ensureAuth, getPost);

router.post('/makepost', upload.single('file'), createPost);

router.post('/:id', comment);

router.delete('/deletePost/:id', deletePost);

export default router;
