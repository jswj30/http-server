const { Todo, User, Complete, JoinTable } = require('../../models');

module.exports = {
  get: async (req, res) => {
    let result = [];
    // 받아올 데이터는 Todo.content, Complete.complete, Complete.important
    let todoList = await Todo.findAll({
      where: { userId: 1 },
      attributes: ['content'],
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

    //get: (req, res) => {
    // let userid = 2;
    // if (userid) {
    //   Todo.findAll({
    //     where: { userId: userid },
    //     attributes: ['id', 'startDate', 'content'],
    //     include: [
    //    {
    //       model: User,
    //       attributes: ['name'],
    //       where: { id: userid }
    //     }, {
    //       model: Complete,
    //       attributes: ['important', 'complete']
    //     }]
    //   })r

    console.log(todoList);
    // for (let i = 0; i < todoList[0].dataValues.Todos.length; i++) {
    //   console.log(todoList[0].dataValues.Todos[i].dataValues);
    // }
    //console.log(result);
  },

  post: async (req, res) => {

  }
}