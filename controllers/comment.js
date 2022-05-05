// Models

import Comment from '../models/Comment.js';

export const comment = async (req, res) => {
  const result = {
    userName: req.user.name,
    comment: req.body.comment,
    postId: req.params.id,
  };

  try {
    await Comment.create(result);
    console.log(result.userName);
    res.redirect(`../${result.postId}`);
  } catch (error) {
    console.error(error);
  }
};
