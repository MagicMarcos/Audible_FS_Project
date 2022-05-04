import cloudinary from '../middleware/cloudinary.js';

// Models
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

// renders feed
export const getFeed = async (req, res) => {
  const posts = await Post.find().sort({ datePosted: -1 });

  try {
    res.render('feed.ejs', { posts: posts, user: req.user });
  } catch (err) {
    console.log(err);
  }
};

// Renders profile page
export const getProfile = async (req, res) => {
  const posts = await Post.find().sort({ datePosted: -1 });
  console.log(req.user);

  try {
    res.render('profile.ejs', { posts: posts, user: req.user });
  } catch (err) {
    console.log(err);
  }
};

// Renders individual post page
export const getPost = async (req, res) => {
  const post = await Post.findById({ _id: req.params.id });
  const comments = await Comment.find({ postId: req.params.id });
  console.log(post);
  try {
    res.render('post.ejs', { post: post, comments: comments });
  } catch (err) {
    console.log(err);
  }
};

export const createPost = async (req, res) => {
  try {
    const cloudinaryResult = await cloudinary.uploader.upload(req.file.path);

    const post = {
      userId: req.user._id,
      userName: req.user.name,
      cloudinaryId: cloudinaryResult.public_id,
      imageUrl: cloudinaryResult.secure_url,
      title: req.body.title,
      caption: req.body.caption,
      description: req.body.description,
    };

    await Post.create(post);

    res.redirect('/profile');
  } catch (error) {
    console.error(error);
  }
};

// TODO: Stretch GOAL -> edit post

export const deletePost = async (req, res) => {
  try {
    const postId = await Post.findById({ _id: req.params.id });

    await cloudinary.uploader.destroy(postId.cloudinaryId);

    await Post.remove({ _id: postId });

    res.redirect(200, '/profile');
  } catch (error) {
    console.error(error);
  }
};
