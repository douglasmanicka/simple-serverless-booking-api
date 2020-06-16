'use strict';

const nodemailer = require('nodemailer')

//As Email Service i used GMAIL just for test
//TODO - Refactor to use AWS-SES
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: 465,
  secure: true, 
  //service: 'Gmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_FROM_PASSWORD
  },
});


module.exports.send = async event => {
  const emailPromises = [];
  for (const record of event.Records) {
    const message =   JSON.parse(record.body).Message
     emailPromises.push(transporter.sendMail({
      from: `Bookings ${process.env.EMAIL_FROM}`, 
      to: process.env.EMAIL_TO,
      subject: "Booking Done ✔", 
      text: message,
      html: message
    }));
  }
  await Promise.all(emailPromises)
  console.log("all emails sent successfully");
  console.log(JSON.stringify(event));
};
