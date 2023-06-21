import { createTransport } from "nodemailer";

export const sendMail = async (email, subject, text) => {
  const transport = createTransport({
    host : process.env.MAIL_HOST,
        port : process.env.MAIL_PORT,

        auth: {
            user : process.env.MAIL_USER ,
            pass : process.env.MAIL_PASS ,
        }
    });
  await transport.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject,
    text,
  });
};

