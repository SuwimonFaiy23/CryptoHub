const crypto = require('crypto');


// ฟังก์ชันสร้าง hash SHA-256
const createSHA256 = (data) => {
        const hash = crypto.createHash('sha256'); // Choose the hashing algorithm (sha256, md5, etc.)
        hash.update(data); // Update the hash with the data to be hashed
        const hashedData = hash.digest('hex'); // data hash
        return hashedData
};

module.exports = { createSHA256 };