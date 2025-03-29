'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trade', {
      id: {
        type: Sequelize.INTEGER,   // กำหนดให้เป็น Integer
        primaryKey: true,         // กำหนดให้เป็น Primary Key
        autoIncrement: true       // กำหนดให้เป็น Auto Increment
      },
      trade_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      buy_order_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      sell_order_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      currency_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_by: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('trade');
  }
};
