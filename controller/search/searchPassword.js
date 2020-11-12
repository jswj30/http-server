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
        res.status(200).send(result.data.password);
      } else {
        res.status(204).send("귀하의 PW을 찾을 수 없습니다.");
      }
    })
  }
};