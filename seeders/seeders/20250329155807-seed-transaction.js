'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('transactions', [
      {
        transaction_id: '1d6d5e0d-36d0-4787-9df2-ebd9d571b3f4',
        user_id: '3980996d-c226-44dc-a761-ddbfcfaf4947',
        order_id: 'edac5c6e-c08f-42fd-b54a-cb46c50e229c',
        transaction_type: 'trade',
        currency_id: '77e01fab-a132-433f-9428-28fac080aa80',
        amount: 10000,
        status: 'pending',
        created_at: new Date(),
        created_by: 'system'
      },
      {
        transaction_id: 'c7641bfd-a265-430d-9c8d-fbf6df729c33',
        user_id: 'fc8266a8-ae8c-4dee-965f-604584a4736c',
        order_id: '9cde33f0-0f48-4a6d-b3a7-08ca44ef3081',
        transaction_type: 'trade',
        currency_id: 'a949bb5d-1abc-4195-9e80-f9d3a2579362',
        amount: 20000,
        status: 'pending',
        created_at: new Date(),
        created_by: 'system'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('transactions', null, {});
  }
};
