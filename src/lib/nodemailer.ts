import { createTransport } from 'nodemailer';

const transporter = createTransport({
  port: 465,
  host: process.env.SMTP_HOST,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: true,
});

export default transporter;
