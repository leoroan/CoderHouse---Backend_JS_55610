import  nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: 'leoroan@gmail.com',
    pass: 'zjlromodnhblszcf'
  }
});

export default transporter;