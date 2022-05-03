import cloudinary from '../middleware/cloudinary.js';

// Models
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

export const comment = async (req, res) => {
  const result = {
    userName: req.user.name,
    comment: req.body.comment,
    postId: req.params.postId,
  };

  try {
    await Comment.create(result);

    res.redirect(201, `post/${result.postId}`);
  } catch (error) {
    console.error(error);
  }
};
