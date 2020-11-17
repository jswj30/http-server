module.exports = {
  post: (req, res) => {
    if (req.session.userid) {
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect('/signin');
        }
      })
    } else {
      res.redirect('/signin');
    }
  }
};