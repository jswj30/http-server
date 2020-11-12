const { User } = require('../../models');

module.exports = {
  post: (req, res) => {
    // 서버만으로 동작이 안되니까 임의로 지정
    User.destroy({
      where: {
        id: req.session.userid,
        password: req.body.password
      }
    })
      .then((result) => {
        if (result) {
          console.log(result);
          res.status(200).send('없앴어여');
        } else {
          console.log(result);
          res.status(404).send("비밀번호가 일치하지 않습니다.");
        }
      })

  }
}