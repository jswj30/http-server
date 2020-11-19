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


    // deleteId : true 변경 뒤 destroy
    let result = await User.destroy({
      where: {
        id: id,
        password: password
      }
    });




    userList.map(list => {
      Complete.update(
        { deleteId: true },
        { where: { id: list.dataValues.Completes[0].id } }
      );
    })

console.log(result);
    if (result) {
      res.status(200).send('없앴어여');
    } else {
      res.status(404).send("비밀번호가 일치하지 않습니다.");
    }
  }
}
