const { User } = require('../../models');

// 회원 가입
module.exports = {
  post: async (req, res) => {
    const { name, password, email, mobile } = req.body;

    if (!name || !password || !email || !mobile) {
      res.status(422).send('다 적어!');
    }

    const userData = await User
      .findOrCreate({
        where: { email },
        defaults: { name: name, password: password, mobile: mobile }
      });

    try {
      if (userData) {
        const [user, created] = userData;

        if (!created) {
          res.status(409).send('이미 존재하는 유저입니다.');
        } else {

          let todo = await Todo.create({
            userId: user.id,
            content: '아직 첫 글이 등록되지 않았습니다.',
            startDate: new Date()
          });
          let com = await Complete.create({
            important: false,
            complete: false,
            deleteId: false
          });

          let join = await JoinTable.create({
            todoId: todo.dataValues.id,
            completeId: com.dataValues.id
          });

          res.status(201).json(user);
        }
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
};
