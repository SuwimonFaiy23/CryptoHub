const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// transaction route
router.post('/transactions', transactionController.createTransaction);
router.get('/transactions/:id', transactionController.getTransactionById);
router.get('/transactions', transactionController.getAllTransactionByUserId);

module.exports = router;