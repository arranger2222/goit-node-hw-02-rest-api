const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async mailData => {
  const email = { ...mailData, from: 'max-maestro@ukr.net' };
  sgMail.send(email);
  return true;
};

module.exports = { sendEmail };
