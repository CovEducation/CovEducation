const express = require('express');
const app = express();
const path = require('path');
const nodemailer = require('nodemailer');
const cors = require('cors');
require("dotenv").config();
const router = express.Router();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", //replace with email provider smtp
  port: 587,
  secure: false,
  auth: {
    user: process.env.COVED_EMAIL, //replace with CovEd email in .env file
    pass: process.env.COVED_PASS //replace with CovEd password in .env file
  },
});

// verify connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

app.post('/send', (req, res, next) => {
  var name = req.body.name
  var email = req.body.email
  var message = req.body.message

  var mail = {
    from: email,
    to: "", //replace with CovEd email
    subject: `New Message from ${name}`,
    html: message
  }

  transporter.sendMail(mail, (err,data) => {
      if(err) {
        res.json({
          status: 'fail'
        })
      } else {
        res.json({
          status: 'success'
        })
      }
    })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.info(`server has started on ${PORT}`))