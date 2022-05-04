import cloudinary from '../middleware/cloudinary.js';

// Models
import Post from '../models/Post.js';

// renders feed
export const getFeed = async (req, res) => {
  try {
    res.render('feed.ejs', {user: req.user });
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
  try {
    res.render('post.ejs');
  } catch (err) {
    console.log(err);
  }
};

export const createPost = async (req, res) => {
  try {
    console.log(
      '==============================================================='
    );
    console.log(req.body);
    const cloudinaryResult = await cloudinary.uploader.upload(req.file.path);

    const post = {
      // userId: req.user._id,
      // userName: req.user.name,
      userId: 321321321321,
      userName: 'boy',
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
