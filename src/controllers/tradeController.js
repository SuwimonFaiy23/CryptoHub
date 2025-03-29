const createUUID = require('../utils/uuid');
const Order = require('../models/order');
const Trade = require('../models/trade');
const moment = require('moment');


// ฟังก์ชันเพิ่ม trade ใหม่
const createTrade = async (req, res) => {
    const { buyOrderId, sellOrderId, currencyId, price, quantity } = req.body;
    try {
        // สร้าง trade id จาก uuid4
        const uniqueId = createUUID.createId()

        // ตรวจสอบค่าว่างตัวแปร sell order id
        if (!buyOrderId) {
            if (!sellOrderId) {
                return res.status(400).json({ message: 'Sell order id is required' });
            }
        }
        // ตรวจสอบค่าว่างตัวแปร buy order id
        if (!sellOrderId) {
            if (!buyOrderId) {
                return res.status(400).json({ message: 'Buy order id is required' });
            }
        }

        // ตรวจสอบค่าว่างตัวแปร currency id
        if (!currencyId) {
            return res.status(400).json({ message: 'Currency id is required' });
        }

        // ตรวจสอบค่าว่างตัวแปร price
        if (!price) {
            return res.status(400).json({ message: 'Price is required' });
        }

        // ตรวจสอบค่าว่างตัวแปร quantity
        if (!quantity) {
            return res.status(400).json({ message: 'Quantity is required' });
        }
        
        // set data into struct
        const trade = {
            trade_id: uniqueId,
            buy_order_id: buyOrderId,
            sell_order_id: sellOrderId,
            currency_id: currencyId,
            price: price,
            quantity: quantity,
            created_by: "system",
            created_at: moment().format('YYYY-MM-DD HH:mm:ss')
        }

        const newTrade = await Trade.create(trade)
        res.status(201).json({ message: 'Trade created', tradeId: newTrade });
    } catch (error) {
        res.status(500).json({ message: 'Error creating trade', error });
    }
};


module.exports = {
    createTrade
};