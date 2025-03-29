const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// order route
router.post('/orders', orderController.createOrder);
router.post('/orders/confirm', orderController.confirmOrder);

module.exports = router;