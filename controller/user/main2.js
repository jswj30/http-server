const { Todo, User, Complete, JoinTable } = require("../../models");
const session = require("express-session");

module.exports = {
  post: async (req, res) => {
    let todoList = await Todo.findAll({
      where: { userId: req.session.userId },
      attributes: ["id", "content", "startDate", "userId"],
      include: [
        {
          model: User,
          attributes: ["name", "email"],
        },
        {
          model: Complete,
          attributes: ["important", "complete"],
        },
      ],
    });

    let result = [];
    for (let i = 0; i < todoList.length; i++) {
      result.push({
        userId: todoList[i].dataValues.userId,
        todoId: todoList[i].dataValues.id,
        name: todoList[i].dataValues.User.dataValues.name,
        email: todoList[i].dataValues.User.dataValues.email,
        content: todoList[i].dataValues.content,
        startDate: todoList[i].dataValues.startDate,
        important: todoList[i].dataValues.Completes[0].dataValues.important,
        complete: todoList[i].dataValues.Completes[0].dataValues.complete,
      });
    }

    console.log(result);

    try {
      if (!result.length) {
        res.status(204).json("아직도 시간보낼게 없어?");
      } else {
        res.status(200).json(result);
      }
    } catch (err) {
      res.sendStatus(500);
    }
  },
};
