const createUUID = require('../utils/uuid');
const createHash = require('../utils/hash');
const User = require('../models/user');
const moment = require('moment');

// ฟังก์ชันดึงข้อมูลผู้ใช้ทั้งหมด
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ฟังก์ชันดึงข้อมูลผู้ใช้งานตาม ไอดี
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        // ค้นหาผู้ใช้ตาม ID
        const user = await User.findOne({ where: { user_id: id } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user); // ส่งข้อมูลผู้ใช้
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

// ฟังก์ชันเพิ่มผู้ใช้ใหม่
const createUser = async (req, res) => {
    try {
        const { name, password, phoneNumber, email, kycStatus } = req.body;
        // สร้าง user id จาก uuid4
        const uniqueId = createUUID.createId()

        // ตรวจสอบค่าว่างตัวแปร name
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        // ตรวจสอบค่าว่างตัวแปร kyc status
        if (!kycStatus) {
            return res.status(400).json({ message: 'KYC Status is required' });
        }

        // ตรวจสอบค่าว่างตัวแปร password
        if (!password || password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters }' });
        }

        // ตรวจสอบค่าว่างตัวแปร phone number
        if (!phoneNumber) {
            // ตรวจสอบค่าว่างตัวแปร email
            if (email) {
                if (!email.includes('@')) {
                    return res.status(400).json({ message: 'Invalid email format' });
                }
            } else {
                return res.status(400).json({ message: 'email is required' });
            }
        }

        // ตรวจสอบค่าว่างตัวแปร email
        if (!email) {
            if (phoneNumber) {
                const phoneRegex = /^\d{10}$/; // ตรวจสอบว่าเป็นตัวเลข 10 หลัก
                if (!phoneRegex.test(phoneNumber)) {
                    return res.status(400).json({ message: 'Invalid phone number format' });
                }
            } else {
                return res.status(400).json({ message: 'phone number is required' });
            }
        }

        // set data into struct
        const user = {
            user_id: uniqueId,
            name: name,
            password_hash: createHash.createSHA256(password),
            phone_number: phoneNumber,
            email: email,
            kyc_status: kycStatus,
            created_by: "user: " + name,
            created_at: moment().format('YYYY-MM-DD HH:mm:ss')
        }

        const newUser = await User.create(user)
        res.status(201).json({ message: 'User created', userId: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

//ฟังก์ชันแก้ไขชื่อผู้ใช้งาน
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        // ค้นหาผู้ใช้ตาม ID
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // อัพเดทข้อมูลผู้ใช้
        user.name = name || user.name;
        user.updated_by = "user: " + name
        user.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
        await user.save();

        res.status(200).json(user); // ส่งข้อมูลผู้ใช้ที่อัพเดทแล้ว
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update user' });
    }
};



module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser
};