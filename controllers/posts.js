import cloudinary from '../middleware/cloudinary.js';

// Models
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import mongoose from 'mongoose';
import User from '../models/User.js';

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
  try {
    const posts = await Post.find({ userId: req.user._id }).sort({
      datePosted: -1,
    });
    res.render('profile.ejs', { posts: posts, user: req.user });
  } catch (err) {
    console.log(err);
  }
};

// Renders individual post page
export const getPost = async (req, res) => {
  const post = await Post.findById({ _id: req.params.id });
  const comments = await Comment.find({ postId: req.params.id });
  const likes = post.upVotes.length - post.downVotes.length;
  console.log(likes);
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
      description: req.body.description,
    };

    await Post.create(post);

    res.redirect('/profile');
  } catch (error) {
    console.error(error);
  }
};

// TODO: Stretch GOAL -> edit post

export const upVote = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const route = req.params.route === 'post' ? `post/${id}` : req.params.route;

  try {
    const post = await Post.findById({ _id: id });

    post.upVotes = updateVotes(post.upVotes, userId);
    post.downVotes = removeVotes(post.downVotes, userId);
    post.likes = post.upVotes.length - post.downVotes.length;

    await post.save();

    const postLikeUpdate = {
      likes: post.likes,
      id: post._id,
    };
    req.socketIO.emit('update', postLikeUpdate);
    res.redirect(`/${route}`);
  } catch (error) {
    console.error(error);
  }
};

export const downVote = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const route = req.params.route === 'post' ? `post/${id}` : req.params.route;

  try {
    const post = await Post.findById({ _id: id });

    post.downVotes = updateVotes(post.downVotes, userId);
    post.upVotes = removeVotes(post.upVotes, userId);
    post.likes = post.upVotes.length - post.downVotes.length;

    await post.save();
    const postLikeUpdate = {
      likes: post.likes,
      id: post._id,
    };
    req.socketIO.emit('update', postLikeUpdate);
    res.redirect(`/${route}`);
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = await Post.findById({ _id: req.params.id });

    await cloudinary.uploader.destroy(postId.cloudinaryId);

    await Post.remove({ _id: postId });

    res.redirect('/profile');
  } catch (error) {
    console.error(error);
  }
};

function updateVotes(votes, userId) {
  const voteSet = new Set(votes);
  if (voteSet.has(userId)) {
    voteSet.delete(userId);
  } else {
    voteSet.add(userId);
  }
  return [...voteSet];
}

function removeVotes(votes, userId) {
  const voteSet = new Set(votes);
  voteSet.delete(userId);
  return [...voteSet];
}
