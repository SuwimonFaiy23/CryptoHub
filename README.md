# CryptoHub

> ระบบซื้อขาย Cryptocurrencies ที่รองรับ BTC, ETH, XRP, DOGE

---

##  Features
- 🔹 ระบบสมัครสมาชิก
- 🔹 รองรับการซื้อ-ขาย (Order Matching)
- 🔹 เชื่อมต่อฐานข้อมูล MySQL
- 🔹 ใช้ `Sequelize` และ `Express.js`

---

## Installation

1. Clone Repository
   ```sh
   git clone https://github.com/SuwimonFaiy23/CryptoHub.git
   cd CryptoHub

2. ติดตั้ง Dependencies
    - npm install

3. ตั้งค่าไฟล์ .env
    - cp .env.example .env

4. Run Migration & Seed Data
    - npx sequelize db:migrate
    - npx sequelize db:seed:all

5. Start Server
    - npm start