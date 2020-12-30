module.exports = {
  get: (req, res) => {
    if (req.session.userId) {
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/signin");
        }
      });
    } else {
      res.redirect("/signin");
    }
  },
};
