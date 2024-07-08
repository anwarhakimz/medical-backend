import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendGmail = async (subject, text, from) => {
  const to = process.env.EMAIL_USER;

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    headers: {
      "Reply-To": from, // Menambahkan header Reply-To
    },
  });

  return "Sent Succesfully";
};

export default { sendGmail };
