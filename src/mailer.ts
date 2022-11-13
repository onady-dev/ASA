import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";

(() => {
  const result = dotenv.config({ path: path.join(__dirname, "..", ".env") });
  if (result.parsed == undefined) {
    throw new Error("Cannot loaded environment variables file.");
  }
})();

export const sendMail = (param: nodemailer.SendMailOptions): boolean => {
  const transporter = nodemailer.createTransport({
    service: "naver",
    host: "smtp.naver.com",
    port: 465,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.NODEMAILER_USER,
    to: param.to,
    subject: param.subject,
    text: param.text,
    html: param.html,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(`Failed to send mail = [${err.name}] ${err.message}`);
      return false;
    } else {
      console.info(`Successed to send mail = [${info.messageId}] ${info.response}`);
    }
  });

  return true;
};
