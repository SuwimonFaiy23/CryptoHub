'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPasswordUser1 = await bcrypt.hash('password123', 10);
    const hashedPasswordUser2 = await bcrypt.hash('password444', 10);

    return queryInterface.bulkInsert('users', [
      {
        user_id: '3980996d-c226-44dc-a761-ddbfcfaf4947',
        name: 'testuser1',
        email: 'test1@example.com',
        password_hash: hashedPasswordUser1,
        kyc_status: 'verified',
        created_at: new Date(),
        created_by: 'system'
      },
      {
        user_id: 'fc8266a8-ae8c-4dee-965f-604584a4736c',
        name: 'testuser2',
        phone_number: '0900000000',
        password_hash: hashedPasswordUser2,
        kyc_status: 'verified',
        created_at: new Date(),
        created_by: 'system'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
