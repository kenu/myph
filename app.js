var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var done = false;

app.use(multer({
  dest: './uploads/',
  rename: function (fieldname, filename) {
      return Date.now();
  },
  onFileUploadStart: function (file) {
      console.log(file.originalname + ' is starting ...')
  },
  onFileUploadComplete: function (file) {
      console.log(file.fieldname + ' uploaded to  ' + file.path)
      done = true;
  }
}).any());

app.use('/', require('./routes/index'));

app.post('/api/photo', function (req, res) {
  if (done == true) {
      console.log(req.files);
      res.end("File uploaded.\n" + JSON.stringify(req.files));
  }
});

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
