const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('../models/user');
const Currency = require('../models/currency');
const Order = require('../models/order');

const Transaction = sequelize.define('transactions', {
    id: {
        type: DataTypes.INTEGER,   // กำหนดให้เป็น Integer
        primaryKey: true,         // กำหนดให้เป็น Primary Key
        autoIncrement: true       // กำหนดให้เป็น Auto Increment
    },
    transaction_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    order_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { // กำหนดเป็น Foreign Key (FK)
            model: Order, // อ้างอิงไปที่ Model 'Order'
            key: 'order_id'   // ใช้ `order_id` เป็น FK
        }
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { // กำหนดเป็น Foreign Key (FK)
            model: User, // อ้างอิงไปที่ Model 'User'
            key: 'user_id'   // ใช้ `user_id` เป็น FK
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
    transaction_type: {
        type: DataTypes.ENUM('deposit', 'withdraw', 'transfer', 'trade'),
        allowNull: true,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'failed'),
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
User.hasMany(Transaction, { foreignKey: 'user_id' });  // User 1 อัน มีหลาย Transaction
Transaction.belongsTo(User, { foreignKey: 'user_id' }); // Transaction ต้องมี User เป็นเจ้าของ

Order.hasMany(Transaction, { foreignKey: 'order_id' });  // Order 1 อัน มีหลาย Transaction
Transaction.belongsTo(Order, { foreignKey: 'order_id' }); // Transaction ต้องมี Order เป็นเจ้าของ

Currency.hasMany(Transaction, { foreignKey: 'currency_id' });  // Currency 1 อัน มีหลาย Transaction
Transaction.belongsTo(Currency, { foreignKey: 'currency_id' }); // Transaction ต้องมี Currency เป็นเจ้าของ

module.exports = Transaction;

