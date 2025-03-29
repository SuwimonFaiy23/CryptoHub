'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('trade', [
      {
        trade_id: '9bf5c568-df3b-4969-9abb-5771ae2daf50',
        buy_order_id: 'edac5c6e-c08f-42fd-b54a-cb46c50e229c',
        sell_order_id: '',
        currency_id: '77e01fab-a132-433f-9428-28fac080aa80',
        price: 10000,
        quantity: 2,
        created_at: new Date(),
        created_by: 'system'
      },
      {
        trade_id: '45a1065d-a9be-447d-be11-55e51ff6091a',
        buy_order_id: '',
        sell_order_id: '9cde33f0-0f48-4a6d-b3a7-08ca44ef3081',
        currency_id: 'a949bb5d-1abc-4195-9e80-f9d3a2579362',
        price: 20000,
        quantity: 1,
        created_at: new Date(),
        created_by: 'system'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('trade', null, {});
  }
};
