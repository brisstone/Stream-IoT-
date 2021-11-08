var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var detailsRoute = require('./routes/details');

var app = express();
// define database variables
// TODO extract to environmental variables if need be
const MONGODB_USERNAME = "nodeuser";
const MONGODB_PASSWORD = "o4kasibe";
const MONGODB_DATABASE = "iot";
// connect to mongoose using the string
const mongoDBconnectionString = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@database.6xmr5.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`
mongoose.connect(mongoDBconnectionString,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true,
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/details', detailsRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
