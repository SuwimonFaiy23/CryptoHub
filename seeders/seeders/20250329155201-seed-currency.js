'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('currency', [
      {
        currency_id: '77e01fab-a132-433f-9428-28fac080aa80',
        name: 'BTC',
        symbol: 'BTC',
        price_usd: 83825.1,
        created_at: new Date(),
        created_by: 'system'
      },
      {
        currency_id: 'fc8266a8-ae8c-4dee-965f-604584a4736c',
        name: 'ETH',
        symbol: 'ETH',
        price_usd: 1880.61,
        created_at: new Date(),
        created_by: 'system'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('currency', null, {});
  }
};
