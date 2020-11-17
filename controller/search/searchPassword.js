const { User } = require('../../models');

module.exports = {
  post: (req, res) => {
    User.findOne({
      where: {
        email: req.body.email,
        name: req.body.name,
        mobile: req.body.mobile
      }
    }).then((result) => {
      if (result) {
        res.status(200).send(`귀하의 PW은 ${result.password} 입니다.`);
      } else {
        res.status(404).send("귀하의 PW을 찾을 수 없습니다.");
      }
    }).catch((err) => {
      res.status(500).send(err);
    })
  }
};