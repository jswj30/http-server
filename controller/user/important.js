const { Todo, User, Complete } = require('../../models');
const sesseion = require('express-session');

module.exports = {
  post: async (req, res) => {
    let { id } = req.body;

    if (id) {
      let findTodo = await Todo.findAll({
        where: {
          userId: id
        },
        attributes: ['id', 'startDate', 'content'],
        include: [{
          model: User,
          attributes: ['name']
        }, {
          model: Complete,
          attributes: ['important', 'complete'],
          where: {
            important: true,
            complete: false
          }
        }]
      })

      let result = [];
      for (let i = 0; i < findTodo.length; i++) {
        result.push({
          id: findTodo[i].dataValues.id,
          startDate: findTodo[i].dataValues.startDate,
          content: findTodo[i].dataValues.content,
          name: findTodo[i].dataValues.User.dataValues.name,
          important: findTodo[i].dataValues.Completes[0].dataValues.important,
          complete: findTodo[i].dataValues.Completes[0].dataValues.complete
        })
      }

      try {
        if (findTodo) {
          res.status(200).json(result);
        } else {
          res.status(404).send('정보를 찾을 수 없습니다.');
        }
      }
      catch {
        res.status(500).send(err);
      }

    }
  },

  patch: async (req, res) => {
    let { id, important, complete, content } = req.body;

    let editCom = await Complete.update({
      important: important,
      complete: complete
    }, {
      where: {
        id: id
      }
    });

    let editTodo = await Todo.update({
      content: content
    }, {
      where: {
        id: id
      }
    });

    let find = await Complete.findOne({
      attributes: ['id', 'important', 'complete'],
      where: {
        id: id,
        important: important,
        complete: complete
      },
      include: {
        model: Todo,
        attributes: ['content']
      }
    })

    let result = {
      id: find.dataValues.id,
      important: find.dataValues.important,
      complete: find.dataValues.complete,
      content: find.Todos[0].content
    };

    try {
      if (editCom && editTodo) {
        console.log(result);
        res.status(200).json(result);
      } else {
        res.status(404).send("error");
      }
    }
    catch {
      res.sendStatus(500);
    }
  }
};