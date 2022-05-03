const cloudinary = require('../middleware/cloudinary');

// Models
const Post = require('../models/Post');
const Comment = require('../models/Comment');

module.exports = {
  // renders feed
  getFeed: async (req, res) => {
    try {
      res.render('feed.ejs');
    } catch (err) {
      console.log(err);
    }
  },
  // Renders profile page
  getProfile: async (req, res) => {
    try {
      res.render('profile.ejs');
    } catch (err) {
      console.log(err);
    }
  },
  // Renders individual post page
  getPost: async (req, res) => {
    try {
      res.render('post.ejs');
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      const cloudinaryResult = await cloudinary.uploader.upload(req.file.path);

      const post = {
        userId: req.user._id,
        userName: req.user.name,
        cloudinaryId: cloudinaryResult.public_id,
        imageUrl: cloudinaryResult.secure_url,
        title: req.body.tile,
        caption: req.body.caption,
        description: req.body.description,
      };

      await Post.create(post);

      res.redirect(201, '/profile');
    } catch (error) {
      console.error(error);
    }
  },

  // TODO: Stretch GOAL -> edit post
  deletePost: async (req, res) => {
    try {
      const postId = await Post.findById({ _id: req.params.id });

      await cloudinary.uploader.destroy(postId.cloudinaryId);

      await Post.remove({ _id: postId });

      res.redirect(200, '/profile');
    } catch (error) {
      console.error(error);
    }
  },
};
