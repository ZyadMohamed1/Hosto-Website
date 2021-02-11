const express = require('express');
const commonController = require('../controllers/commonControllers');
const { authenticateToken } = require('../authentication');

const router = express.Router();

router.post('/login', commonController.login);
router.post('/confirmAccount', commonController.confirmAccount);
router.post('/sendOTP', commonController.sendNewOTP);
router.patch('/resetPassword', authenticateToken, commonController.resetPassword);
router.patch('/forgetPassword', commonController.forgetPassword);

module.exports = router;
