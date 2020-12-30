const { User } = require("../../models");
const session = require("express-session");

module.exports = {
  get: (req, res) => {
    if (req.session.userId) {
      User.findOne({
        where: { id: req.session.userId },
      })
        .then((result) => {
          if (result) {
            res.status(200).json(result);
          } else {
            res.status(404).send("회원 정보를 찾을 수 없습니다.");
          }
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    }
  },

  post: (req, res) => {
    let { id, name, email, password, mobile } = req.body;
    User.update(
      {
        name,
        email,
        password,
        mobile,
      },
      {
        where: { id },
      }
    )
      .then((result) => {
        if (result[0] === 1) {
          res.status(200).json({
            message: "success",
            name: name,
            email: email,
            password: password,
            mobile: mobile,
          });
        } else {
          res.status(404).send("404 error");
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
