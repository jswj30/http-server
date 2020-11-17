const { Todo, User, Complete, JoinTable } = require('../../models');
const session = require('express-session');

module.exports = {
  post: async (req, res) => {
    let { id } = req.body;
    console.log(`id: ${id}`);

    let todoList = await Todo.findAll({
      where: { userId: id }, // 추후에 req.session.userid 변경
      attributes: ['content', 'startDate', 'userId'],
      include: [
        {
          model: User,
          attributes: ['name']
        },
        {
          model: Complete,
          attributes: ['important', 'complete']
        }
      ]
    });

    let result = [];
    for (let i = 0; i < todoList.length; i++) {
      result.push({
        id: todoList[i].dataValues.userId,
        name: todoList[i].dataValues.User.dataValues.name,
        content: todoList[i].dataValues.content,
        startDate: todoList[i].dataValues.startDate,
        important: todoList[i].dataValues.Completes[0].dataValues.important,
        complete: todoList[i].dataValues.Completes[0].dataValues.complete,
      });
    }

    try {
      if (!result.length) {
        res.status(404).json('아직도 시간보낼게 없어?');
      } else {
        res.status(200).json(result);
      }
    } catch (err) {
      res.sendStatus(500);
    }
  }
}
