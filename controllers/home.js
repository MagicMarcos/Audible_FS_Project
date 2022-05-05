export const getIndex = async (req, res) => {
  try {
    res.render('home.ejs');
  } catch (err) {
    console.log(err);
  }
};

// ========== ROOM TRIAL ========
export const getJoin = (req, res) => {
  try {
    res.render('join.ejs');
  } catch (error) {
    console.error(error);
  }
};

export const getChat = (req, res) => {
  try {
    res.render('chat.ejs');
  } catch (error) {
    console.error(error);
  }
};
