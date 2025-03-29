const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('../models/user');
const Currency = require('../models/currency');

const Order = sequelize.define('orders', {
    id: {
        type: DataTypes.INTEGER,   // กำหนดให้เป็น Integer
        primaryKey: true,         // กำหนดให้เป็น Primary Key
        autoIncrement: true       // กำหนดให้เป็น Auto Increment
    },
    order_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { // กำหนดเป็น Foreign Key (FK)
            model: User, // อ้างอิงไปที่ Model 'User'
            key: 'user_id'   // ใช้ `user_id` เป็น FK
        }
    },
    order_type: {
        type: DataTypes.ENUM('buy', 'sell'),
        allowNull: false
    },
    currency_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { // กำหนดเป็น Foreign Key (FK)
            model: Currency, // อ้างอิงไปที่ Model 'Currency'
            key: 'currency_id'   // ใช้ `currency_id` เป็น FK
        }    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('open', 'filled', 'canceled'),
        allowNull: true,
        defaultValue: 'open' // ค่าเริ่มต้น
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
User.hasMany(Order, { foreignKey: 'user_id' });  // User 1 คน มีหลาย Order
Order.belongsTo(User, { foreignKey: 'user_id' }); // Order ต้องมี User เจ้าของ

Currency.hasMany(Order, { foreignKey: 'currency_id' });  // Currency 1 ประเภท มีหลาย Order
Order.belongsTo(Currency, { foreignKey: 'currency_id' });  // Order ต้องมี Currency

module.exports = Order;

