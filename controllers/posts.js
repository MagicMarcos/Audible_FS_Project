module.exports = {
  getFeed: async (req, res) => {
    try {
      res.render('feed.ejs');
    } catch (err) {
      console.log(err);
    }
  },
  getProfile: async (req, res) => {
    try {
      res.render('profile.ejs');
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      res.render('post.ejs');
    } catch (err) {
      console.log(err);
    }
  },
};
