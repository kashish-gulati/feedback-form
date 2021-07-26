const path = require('path');
const express = require('express');
const app = express();
const transporter = require('./config');
const dotenv = require('dotenv');
dotenv.config();

const buildPath = path.join(__dirname,'..','build');
app.use(express.json());
app.use(express.static(buildPath));

app.post('/send',(req,res) => {
    try {
        const mailOptions = {
            from: req.body.email,
            to: process.env.email,
            subject: req.body.subject,
            html:`
            <p>You have new contact request.</p>
            <h3>Contact Details</h3>
            <ul>
                <li>Name: ${req.body.name}</li>
                <li>Email: ${req.body.email}</li>
                <li>Subject: ${req.body.subject}</li>
                <li>Message: ${req.body.message}</li>
            </ul>
            `
        };

        transporter.sendMail(mailOptions, function (err,info) {
            console.log(process.env.email);
            if(err){
                console.error(err);
                res.status(500).send({
                    success:false,
                    message: 'Something went wrong. Try again later'
                });
            }
            else{
                res.send({
                    success:true,
                    message: 'Thanks for contacting us. We will get back to you shortly'
                });
            }
        });
    } catch(error){
        res.status(500).send({
            success:true,
            message: 'Something went wrong. Try again later'
        });
    }
});

app.listen(3000,() => {
    console.log('server start on port 3000');
});
