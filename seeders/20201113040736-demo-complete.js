'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let dummyComplete = [];
    let halfTrue = true;

    for (let i = 0; i < 10; i++) {
      if (i === 4) {
        halfTrue = false;
      }

      let completeData = {
        important: halfTrue,
        complete: halfTrue,
        deleteId: halfTrue,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      dummyComplete.push(completeData);
    }

    return queryInterface.bulkInsert('Completes', dummyComplete, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Completes', null, {});
  }
};