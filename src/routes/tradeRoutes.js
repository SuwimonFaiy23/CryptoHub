const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/tradeController');

// trade route
router.post('/trades', tradeController.createTrade);

module.exports = router;