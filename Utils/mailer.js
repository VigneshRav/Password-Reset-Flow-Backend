import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

//create transporter for mail service
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.PASS_MAIL,
    pass: process.env.PASS_KEY,
  },
});

//sendmail function using nodemailer
const sendEmail = (to, subject, body) => {
  const mailOptions = {
    From: process.env.PASS_MAIL,
    to,
    subject,
    body,
  };
  return transporter.sendMail(mailOptions);
};

export default sendEmail;
