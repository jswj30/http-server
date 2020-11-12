const { User } = require('../../models');

module.exports = {
  post: (req, res) => {
    User.findOne({
      where: {
        name: req.body.name,
        mobile: req.body.mobile
      }
    }).then((result) => {
      if (result) {
        res.status(200).json(result.email);
      } else {
        res.status(404).send("귀하의 email을 찾을 수 없습니다.");
      }
    }).catch((err) => {
      res.status(500).send(err);
    })
  }
};
