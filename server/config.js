const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host:'smtp.gmail.com',
    auth: {
        user: process.env.email,
        pass: process.env.password,
    }
});

module.exports = transporter;