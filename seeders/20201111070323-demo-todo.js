'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let dummyTodos = [];

    for (let i = 1; i < 10; i++) {
      let userNum = 1;
      if (i % 2 === 0) {
        userNum = 2;
      }
      let todoData = {
        content: `${i}번 째 도전!`,
        startDate: new Date(),
        userId: `${userNum}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      dummyTodos.push(todoData);
    }

    return queryInterface.bulkInsert('Todos', dummyTodos, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Todos', null, {});
  }
};