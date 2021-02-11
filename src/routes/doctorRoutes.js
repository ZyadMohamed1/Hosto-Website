const express = require('express');
const doctorController = require('../controllers/doctorController');
const upload = require('../imageStorage');

const router = express.Router();

router.post('/doctors//signUp', upload.single('ID'), doctorController.createNewDoctor);

module.exports = router;
