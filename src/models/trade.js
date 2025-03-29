const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Order = require('../models/order');
const Currency = require('../models/currency');

const Trade = sequelize.define('trade', {
    id: {
        type: DataTypes.INTEGER,   // กำหนดให้เป็น Integer
        primaryKey: true,         // กำหนดให้เป็น Primary Key
        autoIncrement: true       // กำหนดให้เป็น Auto Increment
    },
    trade_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    buy_order_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { // กำหนดเป็น Foreign Key (FK)
            model: Order, // อ้างอิงไปที่ Model 'Order'
            key: 'order_id'   // ใช้ `order_id` เป็น FK
        }    
    },
    sell_order_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { // กำหนดเป็น Foreign Key (FK)
            model: Order, // อ้างอิงไปที่ Model 'Order'
            key: 'order_id'   // ใช้ `order_id` เป็น FK
        }    
    },
    currency_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { // กำหนดเป็น Foreign Key (FK)
            model: Currency, // อ้างอิงไปที่ Model 'Currency'
            key: 'currency_id'   // ใช้ `currency_id` เป็น FK
        }    
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    created_by: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, { timestamps: false });

// 💡 กำหนดความสัมพันธ์ใน Sequelize
Order.hasMany(Trade, { foreignKey: 'user_id' });  // 1 Order มีหลาย Trade
Trade.belongsTo(Order, { foreignKey: 'user_id' }); // Trade ต้องมี Order เจ้าของ

Currency.hasMany(Trade, { foreignKey: 'currency_id' });  // Currency 1 ประเภท มีหลาย Trade
Trade.belongsTo(Currency, { foreignKey: 'currency_id' });  // Trade ต้องมี Currency

module.exports = Trade;

