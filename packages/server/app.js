require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const firebase = require('firebase-admin');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// disable logging when running unit tests
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

/** 
 * Intialize MongoDB.
 * MONGO_URI -- the mongodb connection string
 * MONGO_DB_NAME -- the name of the database to connect to
 */
const mongoUrl = process.env.MONGO_URI;
const databaseName = process.env.MONGO_DB_NAME;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  dbName: databaseName
})
.then(() => console.log('Successfully connected to MongoDB.'))
.catch((err) => console.log(`Error connecting to MongoDB: ${err}`));


/** 
 * Intialize Firebase Service Account.
 * FIREBASE_CREDENTIALS -- path to the service account key
 * FIREBASE_URL -- the url of the database 
 * */ 
const firebaseCredentials = JSON.parse(fs.readFileSync(process.env.FIREBASE_CREDENTIALS));
if (!firebaseCredentials) {
  throw new Error('Cannot find google service account credentials')
}

firebase.initializeApp({ 
  credential: firebase.credential.cert(firebaseCredentials), 
  databaseURL: process.env.FIREBASE_URL
});
console.log('Successfully connected to Firebase.');

/**
 * Intialize Middleware and Routes
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
