const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/users//signUp', userController.createNewUser);

module.exports = router;
