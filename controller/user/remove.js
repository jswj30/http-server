const { User, Todo, Complete } = require('../../models');

module.exports = {
  post: async (req, res) => {
    let { id, password } = req.body;

    let userList = await Todo.findAll({
      where: { userId: id },
      include: [
        {
          model: Complete,
          attributes: ['id', 'deleteId']
        }
      ],
    });

    userList.map(list => {
      Complete.update(
        { deleteId: true },
        { where: { id: list.dataValues.Completes[0].id } }
      );
    })

    // deleteId : true 변경 뒤 destroy
    let result = User.destroy({
      where: {
        id: id,
        password: password
      }
    });

    if (result) {
      res.status(200).send('없앴어여');
    } else {
      res.status(404).send("비밀번호가 일치하지 않습니다.");
    }
  }
}