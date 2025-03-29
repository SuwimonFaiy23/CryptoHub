const crypto = require('crypto');

// ฟังก์ชันสร้าง uuid สำหรับใช้ สร้าง unique id
const createId = () => {
    return crypto.randomUUID();
};

module.exports = { createId };
