'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let dummyTodos = [];

    for (let i = 1; i < 10; i++) {
      let todoData = {
        todoId: i,
        completeId: i,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      dummyTodos.push(todoData);
    }

    return queryInterface.bulkInsert('JoinTables', dummyTodos, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('JoinTables', null, {});
  }
};
