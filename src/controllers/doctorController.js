const express = require('express');
const asyncHandler = require('express-async-handler');
const multer = require('multer');
const path = require('path');
const firebase = require('../config/firebaseConfig');
const bcrypt = require('bcrypt');

require('firebase/firestore');

const router = express.Router();
const db = firebase.firestore();
// image storage
const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, './public/doctorsIDs')
    },
    filename: function (_req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });

// midlewares
router.use('/public', express.static('public'));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// doctor endpoints
router.post("/doctors//signUp", upload.single('ID'), asyncHandler(async (req, res) => {
    const doctor = req.body;
    doctor.password = await bcrypt.hash(req.body.password, 10);
    doctor.role = 1;
    doctor.approved = false;
    if (req.file != undefined) {
        doctor.image_URL = req.file.path;
    }

    await db.collection('users').add(doctor);
    res.sendStatus(201);
}));

module.exports = router;
