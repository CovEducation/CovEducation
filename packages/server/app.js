require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// Firebase boilerplate.
const firebase = require('firebase-admin');
// the google service account file path should be in FIREBASE_CREDENTIALS
// the database name should be in FIREBASE_URL
const firebaseCredentials = JSON.parse(fs.readFileSync(process.env.FIREBASE_CREDENTIALS || './service_account.json'));
if (!firebaseCredentials) {
  throw new Error('Cannot find google service account credentials');
}
firebase.initializeApp({
  credential: firebase.credential.cert(firebaseCredentials),
  databaseURL: process.env.FIREBASE_URL,
});

// firebase.initializeApp();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(cors({ origin: true }));

// disable when running unit tests
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

// firebase setup

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
module.exports = app;
