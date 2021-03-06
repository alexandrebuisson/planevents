const cookieParser = require('cookie-parser');
const express = require('express');
const httpErrors = require('http-errors');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');

// Routes
const indexRouter = require('./routes/index');
const signUp = require('./routes/Auth/signUp');
const signIn = require('./routes/Auth/signIn');
const isConnected = require('./routes/Auth/isConnected');
const createEvent = require('./routes/Events/createEvent');
const getEvent = require('./routes/Events/getEvents');
const deleteEvent = require('./routes/Events/deleteEvent');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/signup', signUp);
app.use('/api/signin', signIn);
app.use('/api/isconnected', isConnected);
app.use('/api/create-event', createEvent);
app.use('/api/get-events', getEvent);
app.use('/api/delete-event', deleteEvent);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpErrors(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
