const { User } = require('../../models');
const sesseion = require('express-session');

module.exports = {
  get: (req, res) => {
    if (req.session.userid) {
      User.findOne({
        where: {
          id: req.session.id
        }
      })
        .then((result) => {
          if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).send("회원 정보를 찾을 수 없습니다.");
          }
        })
    }
  },
  post: (req, res) => {
    let { name, email, password, mobile } = req.body;
    User.update({
      name, email, password, mobile
    }, {
      where: {
        id: 1
      }
    })
      .then((result) => {
        if (result[0] === 1) {
          res.status(200).json({
            message: "success",
            name: name,
            email: email,
            password: password,
            mobile: mobile
          });
        } else {
          res.status(404).send("err");
        }
      })

  }
};