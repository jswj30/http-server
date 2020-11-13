'use strict';

// id 초기화 -> ALTER TABLE [table] AUTO_INCREMENT = 1;
// 실행 : npx sequelize-cli db:seed:all
// 되돌리기 : npx sequelize-cli db:seed:undo
module.exports = {
  up: (queryInterface, Sequelize) => {
    let dummyUsers = [];

    for (let i = 1; i < 3; i++) {
      let userData = {
        name: `User${i}`,
        email: `user${i}@gmail.com`,
        password: `123`,
        mobile: `010-${i}234-1234`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      dummyUsers.push(userData);
    }

    return queryInterface.bulkInsert('Users', dummyUsers, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
