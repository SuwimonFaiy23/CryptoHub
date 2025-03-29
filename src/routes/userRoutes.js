const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// user route
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);

// seed user
module.exports = router;