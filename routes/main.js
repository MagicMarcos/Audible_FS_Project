import express from 'express';
import { multerUploadConfig as upload } from '../middleware/multer.js';

import { getIndex, getJoin, getChat } from '../controllers/home.js';
import { getFeed, getProfile } from '../controllers/posts.js';
import {
  getLogin,
  postLogin,
  getSignup,
  postSignUp,
  updateUser,
  logout,
} from '../controllers/auth.js';
import { useSocket } from '../middleware/socket-io.js';
import { ensureAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getIndex);

// TODO add AUTH to pages below
router.get('/feed', ensureAuth, useSocket, getFeed);
router.get('/profile', ensureAuth, useSocket, getProfile);

router.get('/login', getLogin);
router.post('/login', postLogin);

router.get('/signup', getSignup);
router.post('/signup', postSignUp);

router.put('/updateUser/:id', upload.single('file'), updateUser);

router.get('/logout', logout);

// ======== ROOM TRIAL =========
router.get('/join', getJoin);
router.get('/chat', getChat);
export default router;
