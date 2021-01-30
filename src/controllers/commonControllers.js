require('dotenv').config();
const express = require('express');
const asyncHandler = require('express-async-handler');
const firebase = require('../config/firebaseConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('firebase/firestore');

const router = express.Router();
const db = firebase.firestore();

// midlewares
router.use(express.json());

// endpoints
router.post("/logIn", asyncHandler(async (req, res) => {

    const snapshot = await db.collection('users').where('email', '==', req.body.email).get();

    if (!snapshot.empty) {

        snapshot.forEach(async (doc) => {
            const allowed = await bcrypt.compare(req.body.password, doc.data().password);

            if (allowed) {
                const user = {
                    name: doc.data().firstName + ' ' + doc.data().firstName,
                    userName: doc.data().userName,
                    email: doc.data().email,
                    phoneNumber: doc.data().phoneNumber
                }
                const accessTocken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                res.json({accessTocken: accessTocken});
            }
            else {
                res.json("Not allowed, wrong password!");
            }
        });

    }
    else {
        res.json("Not fuound! Please enter right email or signUp.");
    }

}));

module.exports = router;
