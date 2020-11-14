const { Todo, User, Complete, JoinTable } = require('../../models');
const session = require('express-session');

module.exports = {
  get: async (req, res) => {
    let result = [];
    let todoList = await Todo.findAll({
      where: { userId: 1 },
      attributes: ['content', 'startDate'],
      include: [
        {
          model: User,
          attributes: ['name'],
          where: { id: 1 }
        },
        {
          model: Complete,
          attributes: ['important', 'complete']
        }
      ]
    });

    for (let i = 0; i < todoList.length; i++) {
      result.push({
        id: 1, // 추후에 req.session.userid 변경
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
  },

  post: async (req, res) => {
    // 조인하지 않고 각 테이블에 findOrCreate
    let { userId, content, startDate, important, complete, deleteId } = req.body;

    let todo = await Todo.create({
      userId: userId,
      content: content,
      startDate: startDate
    });
    let com = await Complete.create({
      important: important,
      complete, complete,
      deleteId: deleteId
    });

    let join = await JoinTable.create({
      todoId: todo.dataValues.id,
      completeId: com.dataValues.id
    });

    try {
      if (todo && com && join) {
        let result = {
          id: todo.dataValues.userId,
          content: todo.dataValues.content,
          startDate: todo.dataValues.startDate,
          important: com.dataValues.important,
          complete: com.dataValues.complete
        }

        res.status(201).json(result);

      }
    } catch (err) {
      res.sendStatus(500);
    }
  },
}