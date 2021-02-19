require('firebase/firestore');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const firebase = require('../config/firebaseConfig');
const { emailValidation } = require('../signUp methods/emailValidation');
const { generateOTP } = require('../signUp methods/otpGeneration');

const db = firebase.firestore();

const userController = {
  createNewUser: asyncHandler(async (req, res) => {
    const user = req.body;
    const snapshot = await db.collection('users').where('email', '==', user.email).get();
    const snapshot1 = await db.collection('users').where('email', '==', user.userName ).get();

    if (!emailValidation(user.email)) {
      res.status(400).json('Wrong email configuration.');
      return;
    }
    if (!snapshot.empty) {
      res.json('Email is already in use.');
      return;
    }
    if (!snapshot1.empty) {
      res.json('User Name is already in use.');
      return;
    }

     user.password = await bcrypt.hash(user.password, 10);
    user.role = 2;
    
    const code = await generateOTP(user.email);
    user.IsActive = false;
    user.OTP = code.OTP;
    user.OTPCreationTime = code.OTPCreationTime;

    code.transport.sendMail(code.mail, async (err) => {
      if (err) {
        res.status(400).json(err);
      }
      await db.collection('users').add(user);
      res.sendStatus(201);
    });
  }),
};

module.exports = userController;
