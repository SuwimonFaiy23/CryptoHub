const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('../models/user');
const Currency = require('../models/currency');

const DepositsWithdraws = sequelize.define('deposits_withdraws', {
    id: {
        type: DataTypes.INTEGER,   // กำหนดให้เป็น Integer
        primaryKey: true,         // กำหนดให้เป็น Primary Key
        autoIncrement: true       // กำหนดให้เป็น Auto Increment
    },
    deposits_withdraws_id: {
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
    type: {
        type: DataTypes.ENUM('deposit', 'withdraw'),
        allowNull: false
    },
    currency_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { // กำหนดเป็น Foreign Key (FK)
            model: Currency, // อ้างอิงไปที่ Model 'Currency'
            key: 'currency_id'   // ใช้ `currency_id` เป็น FK
        }   
     },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'failed'),
        allowNull: true,
        defaultValue: 'pending' // ค่าเริ่มต้น
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
User.hasMany(DepositsWithdraws, { foreignKey: 'user_id' });  // User 1 คน มีหลายรายการโอน/ถอน
DepositsWithdraws.belongsTo(User, { foreignKey: 'user_id' }); // การโอน/ถอน ต้องมี User เจ้าของ

Currency.hasMany(DepositsWithdraws, { foreignKey: 'currency_id' });  // Currency 1 ประเภท มีหลาย DepositsWithdraws
DepositsWithdraws.belongsTo(Currency, { foreignKey: 'currency_id' });  // การโอน/ถอน ต้องมี Currency

module.exports = DepositsWithdraws;

