const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Firebase boilerplate.
const admin = require('firebase-admin');

const serviceAccount = require('./service_account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const indexRouter = require('./routes/index');
const mentorsRouter = require('./routes/mentors');

const app = express();

// disable logging when running unit tests
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/', indexRouter);
app.use('/mentors', mentorsRouter);
module.exports = app;
