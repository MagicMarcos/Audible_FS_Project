import express from 'express';
import { multerUploadConfig as upload } from '../middleware/multer.js';

import {
  getPost,
  createPost,
  deletePost,
  upVote,
  downVote,
} from '../controllers/posts.js';
import { comment } from '../controllers/comment.js';
import { useSocket } from '../middleware/socket-io.js';
import { ensureAuth } from '../middleware/auth.js';

const router = express.Router();

//Post Routes
// TODO: make sure to ensure auth here
router.get('/:id', ensureAuth, getPost);

router.post('/makepost', upload.single('file'), createPost);

router.post('/comment/:id', comment);

router.put('/upVote/:id/:route', useSocket, upVote);

router.put('/downVote/:id/:route', useSocket, downVote);

router.delete('/deletePost/:id', deletePost);

export default router;
