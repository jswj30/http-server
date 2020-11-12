const { User } = require('../../models');

// 회원 가입
module.exports = {
  post: async (req, res) => {
    const { name, password, email, mobile } = req.body;

    if (!name || !password || !email || !mobile) {
      res.status(422).send('다 적어!');
    }

    try {
      const userData = await User
        .findOrCreate({
          where: { name, password, email, mobile },
          default: { name, password, email, mobile }
        });

      if (userData) {
        const [user, created] = userData;

        if (!created) {
          res.status(409).send('이미 존재하는 유저입니다.');
        } else {
          res.status(201).json(user);
        }
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
};