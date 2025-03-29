const createUUID = require('../utils/uuid');
const Order = require('../models/order');
const Transaction = require('../models/transaction');
const moment = require('moment');


// ฟังก์ชันเพิ่ม transaction ใหม่
const createTransaction = async (req, res) => {
    const { userId, orderId, transaction_type, currencyId, amount, status } = req.body;
    try {
        // สร้าง transaction id จาก uuid4
        const uniqueId = createUUID.createId()

        // ตรวจสอบค่าว่างตัวแปร user id
        if (!userId) {
            return res.status(400).json({ message: 'User id is required' });
        }

        // ตรวจสอบค่าว่างตัวแปร order id
        if (!orderId) {
            return res.status(400).json({ message: 'Order id is required' });
        }

        // ตรวจสอบค่าว่างตัวแปร transaction type
        if (!transaction_type) {
            return res.status(400).json({ message: 'Transaction type is required' });
        }

        // ตรวจสอบค่าว่างตัวแปร currency id
        if (!currencyId) {
            return res.status(400).json({ message: 'Currency id is required' });
        }

        // ตรวจสอบค่าว่างตัวแปร amount
        if (!amount) {
            return res.status(400).json({ message: 'Amount id is required' });
        }
        // ตรวจสอบค่าว่างตัวแปร status
        if (!status) {
            return res.status(400).json({ message: 'Status id is required' });
        }

        // get name from user table
        const user = await User.findOne({ where: { user_id: userId } })
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // set data into struct
        const transaction = {
            transaction_id: uniqueId,
            user_id: userId,
            order_id: orderId,
            transaction_type: transaction_type,
            currency_id: currencyId,
            amount: amount,
            status: status,
            created_by: "user: " + user.dataValues.name,
            created_at: moment().format('YYYY-MM-DD HH:mm:ss')
        }

        const newTransaction = await Transaction.create(transaction)
        res.status(201).json({ message: 'Transaction created', transactionId: newTransaction });
    } catch (error) {
        res.status(500).json({ message: 'Error creating transaction', error });
    }
};

// ฟังก์ชันดึงข้อมูล transaction ตาม user id
const getTransactionById = async (req, res) => {
    const { id } = req.params;
    try {
        // ค้นหาผู้ใช้ตาม ID
        const transaction = await Transaction.findOne({ where: { transaction_id: id } });
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(200).json(transaction); // ส่งข้อมูล transaction
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch transaction by id' });
    }
};

// ฟังก์ชันดึงข้อมูล transaction ทั้งหมด
const getAllTransactionByUserId = async (req, res) => {
    const { userId } = req.body;
    try {
        // ค้นหา transaction ตาม user id
        const transaction = await Transaction.findAll({
            where: { user_id: userId },
            order: [['created_at', 'DESC']]
        });

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(200).json(transaction); // ส่งข้อมูล transaction
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch transaction all by user id' });
    }
};


module.exports = {
    createTransaction,
    getTransactionById,
    getAllTransactionByUserId
};