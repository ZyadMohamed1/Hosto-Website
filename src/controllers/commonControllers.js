require('dotenv').config();
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const firebase = require('../config/firebaseConfig');
const { generateOTP } = require('../signUp methods/otpGeneration');

require('firebase/firestore');

const db = firebase.firestore();

const commonController = {
  login: asyncHandler(async (req, res) => {
    const snapshot = await db.collection('users').where('email', '==', req.body.email).get();
    if (snapshot.empty) {
      res.status(401).json('Wrong email.');
    }

    snapshot.forEach(async (doc) => {
      if (!doc.data().IsActive) {
        res.status(401).json('Unconfirmed email address.');
      }
      if (!((doc.data().role === 1 && doc.data().approved) || doc.data().role === 2)) {
        res.status(401).json('Disapproved account.');
      }

      const allowed = await bcrypt.compare(req.body.password, doc.data().password);
      if (!allowed) {
        res.status(401).json('Wrong password!');
      }

      const user = {
        name: `${doc.data().firstName} ${doc.data().firstName}`,
        userName: doc.data().userName,
        email: doc.data().email,
        phoneNumber: doc.data().phoneNumber,
        role: doc.data().role,
      };

      const accessTocken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
      res.json({ accessTocken: accessTocken });
    });
  }),

  confirmAccount: asyncHandler(async (req, res) => {
    const confirmData = req.body;
    const snapshot = await db.collection('users').where('email', '==', confirmData.email).get();
    if (snapshot.empty) {
      res.status(401).json('Wrong email.');
    }

    snapshot.forEach(async (doc) => {
      const ID = db.collection('users').doc(doc.id);
      const currentDate = new Date();
      const OTPCreationTime = new Date(doc.data().OTPCreationTime);

      if (confirmData.OTP !== doc.data().OTP || doc.data().OTP === null) {
        res.status(401).json('Invalid code.');
      }
      if (currentDate.getTime() > (OTPCreationTime.getTime() + 5 * 60000)) {
        res.status(401).json('Expired code.');
      }

      await ID.update({ IsActive: true });
      await ID.update({ OTP: null });
      await ID.update({ OTPCreationTime: null });

      res.sendStatus(200);
    });
  }),

  sendNewOTP: asyncHandler(async (req, res) => {
    const data = req.body;
    const snapshot = await db.collection('users').where('email', '==', data.email).get();

    if (snapshot.empty) {
      res.json('Wrong email.');
    }

    snapshot.forEach(async (doc) => {
      const ID = db.collection('users').doc(doc.id);
      const newValidOTP = await generateOTP(data.email);

      await ID.update({ OTP: newValidOTP.OTP });
      await ID.update({ OTPCreationTime: newValidOTP.OTPCreationTime });

      newValidOTP.transport.sendMail(newValidOTP.mail, async (err) => {
        if (err) {
          res.status(400).json(err);
        }
        res.sendStatus(201);
      });
    });
  }),

  resetPassword: asyncHandler(async (req, res) => {
    const { user } = req;
    user.password = req.body.password;
    user.newPassword = req.body.newPassword;
    const snapshot = await db.collection('users').where('email', '==', user.email).get();

    if (snapshot.empty) {
      res.status(401).json('Wrong email.');
    }

    snapshot.forEach(async (doc) => {
      const allowed = await bcrypt.compare(user.password, doc.data().password);
      const ID = db.collection('users').doc(doc.id);

      if (!allowed) {
        res.status(401).json('Wrong password.');
      }

      user.newPassword = await bcrypt.hash(user.newPassword, 10);
      await ID.update({ password: user.newPassword });
      res.status(200);
    });
  }),

  forgetPassword: asyncHandler(async (req, res) => {
    const data = req.body;
    const snapshot = await db.collection('users').where('email', '==', data.email).get();
    if (snapshot.empty) {
      res.status(401).json('Wrong email.');
    }

    snapshot.forEach(async (doc) => {
      const ID = db.collection('users').doc(doc.id);
      const currentDate = new Date();
      const OTPCreationTime = new Date(doc.data().OTPCreationTime);

      if (!(data.OTP === doc.data().OTP && doc.data().OTP !== null)) {
        res.status(401).json('Invalid code.');
      }
      if (currentDate.getTime() > (OTPCreationTime.getTime() + 5 * 60000)) {
        res.status(401).json('Expired code.');
      }

      data.newPassword = await bcrypt.hash(data.newPassword, 10);

      await ID.update({ OTP: null });
      await ID.update({ OTPCreationTime: null });
      await ID.update({ password: data.newPassword });

      res.status(200);
    });
  }),
};

module.exports = commonController;
