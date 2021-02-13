require('firebase/firestore');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const firebase = require('../config/firebaseConfig');
const { emailValidation } = require('../signUp methods/emailValidation');
const { generateOTP } = require('../signUp methods/otpGeneration');

const db = firebase.firestore();

const doctorController = {
    createNewDoctor: asyncHandler(async (req, res) => {
    const doctor = req.body;
    const snapshot = await db.collection('users').where('email', '==', doctor.email).get();

    if (!emailValidation(doctor.email)) {
      res.status(400).json('Wrong email configuration.');
    }
    if (!snapshot.empty) {
      res.json('Email is already in use.');
    }

    doctor.password = await bcrypt.hash(doctor.password, 10);
    doctor.role = 1;
    doctor.approved = false;
    if (req.file !== undefined) {
      doctor.image_URL = req.file.path;
    }

    const code = await generateOTP(doctor.email);
    doctor.IsActive = false;
    doctor.OTP = code.OTP;
    doctor.OTPCreationTime = code.OTPCreationTime;

    code.transport.sendMail(code.mail, async (err) => {
      if (err) {
        res.status(400).json(err);
      }
      await db.collection('users').add(doctor);
      res.sendStatus(201);
    });
  }),
};

module.exports = doctorController;
