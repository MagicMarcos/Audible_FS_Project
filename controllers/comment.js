import cloudinary from '../middleware/cloudinary.js';

// Models
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

export const comment = async (req, res) => {
  const result = {
    userName: req.user.name,
    comment: req.body.comment,
    postId: req.params.id,
  };
  console.log('commented');
  try {
    await Comment.create(result);

    res.redirect(`../post/${result.postId}`);
  } catch (error) {
    console.error(error);
  }
};
