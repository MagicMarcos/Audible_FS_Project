import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  caption: {
    type: String,
  },
  userName: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', PostSchema);
export default Post;
