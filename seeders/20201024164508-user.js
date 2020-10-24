'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Anna',
        lastName: 'Anderson',
        email: 'anna@email.com',
        gitHubID: null,
        gitHubUsername: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Billy',
        lastName: 'Broadus',
        email: 'billy@email.com',
        gitHubID: null,
        gitHubUsername: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Carlos',
        lastName: 'Cunningham',
        email: 'carlos@email.com',
        gitHubID: null,
        gitHubUsername: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
