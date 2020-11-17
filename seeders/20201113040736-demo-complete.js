'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let dummyTodos = [];

    for (let i = 1; i < 10; i++) {
      let todoData = {
        important: true,
        complete: false,
        deleteId: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      dummyTodos.push(todoData);
    }

    return queryInterface.bulkInsert('Completes', dummyTodos, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Completes', null, {});
  }
};


// 'use strict';

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */
//   },

//   down: async (queryInterface, Sequelize) => {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//   }
// };
