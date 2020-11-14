const { Complete, Todo } = require('../../models');

// Complete.important, Complete.complete, Todo.content 업데이트
module.exports = {
  post: async (req, res) => {
    let { id, important, complete, content } = req.body;

    let editCom = await Complete.update({
      important: important,
      complete: complete,
      content: content
    }, {
      where: {
        id: id
      },
      include: {
        model: Todo,
        where: {
          id: id
        }
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
}