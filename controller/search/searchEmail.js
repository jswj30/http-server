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
        res.status(200).send(result.data.email);
      } else {
        res.status(204).send("귀하의 email을 찾을 수 없습니다.");
      }
    })
  }
};