export const getIndex = async (req, res) => {
  try {
    res.render('home.ejs');
  } catch (err) {
    console.log(err);
  }
};
