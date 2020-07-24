const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users'); // For getting the data of the current user.
// const mentorsRouter = require('./routes/mentors'); // For querying our mentor database.

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
// app.use('/users', usersRouter);
// app.use('/mentors', mentorsRouter);
module.exports = app;
