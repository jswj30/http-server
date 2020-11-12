const { User } = require('../../models');
const session = require('express-session');

module.exports = {
  post: (req, res) => {
    if (req.session.userid) {
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect('/');
        }
      })
    } else {
      res.redirect('/');
    }
  }
};