const nodemailer = require("nodemailer");
require("dotenv").config();

const { MAILTRAP_USER, MAILTRAP_PASSWORD, MAIL_HOST, EMAIL_FOR_SEND_VERIFY } =
  process.env;

const transport = nodemailer.createTransport({
  host: MAIL_HOST,
  port: 2525,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASSWORD,
  },
});

function sendEmail(message) {
  message.from = EMAIL_FOR_SEND_VERIFY;

  return transport.sendMail(message);
}

module.exports = sendEmail;
