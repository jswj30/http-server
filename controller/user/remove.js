const { User, Todo, Complete } = require('../../models');

module.exports = {
  post: async (req, res) => {
    let userList = await Todo.findAll({
      where: { userId: 1 },
      include: [
        {
          model: Complete,
          attributes: ['id']
        }
      ],
    });

    userList.map(list => {
      Complete.update(
        { deleteId: false },
        { where: { id: list.dataValues.Completes[0].id } }
      );
    })

    // deleteId : true 변경 뒤 destroy
    let result = User.destroy({
      where: {
        id: req.session.userid,
        password: req.body.password
      }
    });


    if (result) {
      res.status(200).send('없앴어여');
    } else {
      res.status(404).send("비밀번호가 일치하지 않습니다.");
    }
  }
}