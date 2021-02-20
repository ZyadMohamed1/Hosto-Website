const express = require('express');
const accountsController = require('../controllers/accountsController');
const { authenticateToken } = require('../authentication');

const router = express.Router();

router.post('/login', accountsController.login);
router.patch('/confirmAccount', accountsController.confirmAccount);
router.post('/sendOTP', accountsController.sendNewOTP);
router.patch('/resetPassword', authenticateToken, accountsController.resetPassword);
router.patch('/forgetPassword', accountsController.forgetPassword);

module.exports = router;
