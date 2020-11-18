const { Todo, User, Complete, JoinTable } = require('../../models');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT_SECRET;
let test = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE2MDU2Njg0NjIsImV4cCI6MTYwNTY2OTA2Mn0.T7tyFy2LUveWS7bwrM4dAZp2nUXxubJgFNGqqt_JsSM';
module.exports = {
  get: async (req, res) => {
    let result = [];
    //console.log('토큰토큰토큰토큰 : ', req.cookies);
    let decode = jwt.verify(test, jwtKey);
    console.log('이거디아기어어!!', decode.id);

    let todoList = await Todo.findAll({
      where: { userId: decode.id }, // 추후에 req.session.userid 변경
      attributes: ['content', 'startDate'],
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

    for (let i = 0; i < todoList.length; i++) {
      result.push({
        id: req.session.userid, // 추후에 req.session.userid 변경
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
    let { content, startDate, important } = req.body;

    let todo = await Todo.create({
      userId: req.session.userid,
      content: content,
      startDate: startDate
    });
    let com = await Complete.create({
      important: important,
      complete: false,
      deleteId: false
    });

    let join = await JoinTable.create({
      todoId: todo.dataValues.id,
      completeId: com.dataValues.id
    });

    try {
      if (todo && com && join) {

        let result = {
          userId: todo.dataValues.userid,
          todoId: todo.dataValues.id,
          content: todo.dataValues.content,
          startDate: todo.dataValues.startDate,
          important: com.dataValues.important,
          complete: com.dataValues.complete
        }
        console.log(result);
        res.status(201).json(result);

      }
    } catch (err) {
      res.sendStatus(500);
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
}
