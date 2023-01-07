const express = require('express');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./src/routes/index');
const userRouter = require('./src/routes/users');

// connect to database and models
require('./lib/connectMongoose');
require('./src/routes/api/advert');
const app = express();

app.locals.title = 'Nodepop';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded( {extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route to my API
app.use('/api/adverts', require('./src/routes/api/advert'));

// Routes to my website 
app.use('/', indexRouter);
app.use('/users', userRouter);

// catch 404 and forward to error handler 
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler 
app.use(function(err, req, res, next) {
  // check if it's a validation error
  if (err.array) {
    err.status = 422; // validation error
    const errorInfo = err.array({ onlyFirstError: true }) [0];
    console.log(errorInfo);
    err.message = `Error in ${errorInfo.location}, param "${errorInfo.param}" ${errorInfo.msg}`;
  }

  res.status(err.status || 500);

  // if it's an API request, response in JSON format
  if (req.originalUrl.startsWith('/api/')) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development 
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page 
  res.render('error');
});

module.exports = app;