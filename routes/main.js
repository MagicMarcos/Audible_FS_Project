const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const postsController = require('../controllers/posts');
// const { ensureAuth, ensureGuest } = require('../middleware/auth');

//Main Routes - simplified for now
router.get('/', homeController.getIndex);

// TODO add AUTH to pages below
router.get('/feed', postsController.getFeed);
router.get('/profile', postsController.getProfile);
router.get('/post', postsController.getPost);
router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup);

module.exports = router;
