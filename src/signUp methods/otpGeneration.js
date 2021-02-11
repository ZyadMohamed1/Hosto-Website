require('dotenv').config();
const nodemailer = require('nodemailer');
const OTPGenerator = require('otp-generator');

module.exports = {
  generateOTP: async (userEmail) => {
    const transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const OTP = OTPGenerator.generate(5, { upperCase: false, specialChars: false });
    const OTPCreationTime = Date.now();
    const mail = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: 'Email validation',
      html: `<h2>Here your validation code: </h2> <p> </p>${OTP.bold()}<p>Use this code to <b>confirm</b> your email.</p>`,
    };

    return {
      OTP: OTP,
      OTPCreationTime: OTPCreationTime,
      mail: mail,
      transport: transport,
    };
  },
};
