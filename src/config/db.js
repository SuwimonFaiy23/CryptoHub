// const mysql = require('mysql2');
require('dotenv').config();  // โหลดค่าจากไฟล์ .env
const { Sequelize } = require('sequelize');


// สร้างการเชื่อมต่อ database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

// เชื่อมต่อฐานข้อมูล
sequelize.authenticate()
  .then(() => console.log('✅ Database connected...'))
  .catch(err => console.error('❌ Database connection error:', err));

module.exports = sequelize;
