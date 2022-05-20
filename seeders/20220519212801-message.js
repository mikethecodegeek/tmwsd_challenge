'use strict';
const faker = require('faker');

module.exports = {
  async up (queryInterface, Sequelize) {
 
    const messages = []
    for (let i = 0; i < 100; i++) {
      messages.push({
        text: faker.lorem.paragraph(),
        title: faker.lorem.sentence(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('messages', messages, {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('messages', null, {});
  }
};
