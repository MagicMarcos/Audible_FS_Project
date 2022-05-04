import express from 'express';

import { getIndex } from '../controllers/home.js';
import { getFeed, getProfile } from '../controllers/posts.js';
import { getLogin, getSignup } from '../controllers/auth.js';
import { ensureAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getIndex);

// TODO add AUTH to pages below
router.get('/feed', getFeed);
router.get('/profile', getProfile);
// router.get('/post', postsController.getPost);
router.get('/login', getLogin);
router.get('/signup', getSignup);

export default router;
