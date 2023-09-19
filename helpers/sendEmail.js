const nodemailer = require("nodemailer");
require("dotenv").config();

const { MAILTRAP_USER, MAILTRAP_PASSWORD, MAIL_HOST } = process.env;

const transport = nodemailer.createTransport({
  host: MAIL_HOST,
  port: 2525,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASSWORD,
  },
});

function sendEmail(message) {
  message.from = "oleksii.lunin@gmail.com";

  return transport.sendMail(message);
}

module.exports = sendEmail;
