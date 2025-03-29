const createUUID = require('../utils/uuid');
const User = require('../models/user');
const Order = require('../models/order');
const moment = require('moment');


// ฟังก์ชันเพิ่มออเดอร์ใหม่
const createOrder = async (req, res) => {
    const { userId, orderType, currencyId, price, quantity, status } = req.body;
    try {
        // สร้าง order id จาก uuid4
        const uniqueId = createUUID.createId()

        // ตรวจสอบค่าว่างตัวแปร user id
        if (!userId) {
            return res.status(400).json({ message: 'User id is required' });
        }

        // ตรวจสอบค่าว่างตัวแปร order type
        if (!orderType) {
            return res.status(400).json({ message: 'Order type is required' });
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

        // ตรวจสอบค่าว่างตัวแปร status
        if (!status) {
            return res.status(400).json({ message: 'status is required' });
        }

        // get name from user table
        const user = await User.findOne({ where: { user_id: userId } })
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // set data into struct
        const order = {
            order_id: uniqueId,
            user_id: userId,
            order_type: orderType,
            currency_id: currencyId,
            price: price,
            quantity: quantity,
            status: status,
            created_by: "user: " + user.dataValues.name,
            created_at: moment().format('YYYY-MM-DD HH:mm:ss')
        }

        const newOrder = await Order.create(order)

        // update match order
        await checkMatchOrder()

        res.status(201).json({ message: 'Order created', orderId: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
};

// ฟังก์ชัน check match order
async function checkMatchOrder() {
    try {
        // คำสั่งขายที่ยังไม่ดำเนินการ
        const sellOrders = await Order.findAll({
            where: {
                type: 'sell',
                status: 'open'
            },
            order: [['price', 'ASC']] // เรียงจากราคาต่ำสุด
        });

        // คำสั่งซื้อที่ยังไม่ดำเนินการ
        const buyOrders = await Order.findAll({
            where: {
                type: 'buy',
                status: 'open'
            },
            order: [['price', 'DESC']] // เรียงจากราคาสูงสุด
        });
        sellOrders.forEach(async (sellOrder) => {
            buyOrders.forEach(async (buyOrder) => {
                if (buyOrder.price >= sellOrder.price) {
                    // คำสั่งซื้อและขายสามารถจับคู่ได้
                    const matchedQuantity = Math.min(sellOrder.quantity, buyOrder.quantity);

                    // อัปเดตคำสั่งซื้อและขาย
                    await Order.update({ quantity: sellOrder.quantity - matchedQuantity }, {
                        where: { id: sellOrder.id }
                    });

                    await Order.update({ quantity: buyOrder.quantity - matchedQuantity }, {
                        where: { id: buyOrder.id }
                    });

                    // ถ้าคำสั่งถูกจับคู่หมด ให้เปลี่ยนสถานะคำสั่งเป็น 'matched'
                    if (sellOrder.quantity - matchedQuantity === 0) {
                        await Order.update({ status: 'matched' }, { where: { id: sellOrder.id } });
                    }

                    if (buyOrder.quantity - matchedQuantity === 0) {
                        await Order.update({ status: 'matched' }, { where: { id: buyOrder.id } });
                    }
                }
            })
        })
    } catch (error) {
        res.status(500).json({ message: 'Error get order', error });
    }
};

// ฟังก์ชัน confirm order
const confirmOrder = async (req, res) => {
    const { orderId, status } = req.body;
    try {
        // ตรวจสอบค่าว่างตัวแปร order id
        if (!orderId) {
            return res.status(400).json({ message: 'Order id is required' });
        }

        // ตรวจสอบค่าว่างตัวแปร status
        if (!status) {
            return res.status(400).json({ message: 'status is required' });
        }

        // check order 
        const order = await Order.findOne({ where: { order_id: orderId } })
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // get name from user table
        const user = await User.findOne({ where: { user_id: orderData.dataValues.user_id } })
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // update status
        order.status = status
        order.updated_by = "user: " + user.dataValues.name
        order.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')

       await order.save();

       res.status(200).json(user); // ส่งข้อมูล order ที่ update แล้ว
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
};


module.exports = {
    createOrder,
    confirmOrder
};