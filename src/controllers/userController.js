const express = require('express');
const asyncHandler = require('express-async-handler');
const firebase = require('../config/firebaseConfig');
const bcrypt = require('bcrypt');

require('firebase/firestore');

const router = express.Router();
const db = firebase.firestore();

// midlewares
router.use(express.json());

// user endpoints
router.post("/users//signUp", asyncHandler(async (req, res) => {
    const user = req.body;
    user.password = await bcrypt.hash(req.body.password, 10);
    user.role = 2;

    await db.collection('users').add(user);
    res.sendStatus(201);
}));

module.exports = router;
