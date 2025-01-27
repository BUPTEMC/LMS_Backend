var createError = require('http-errors');
var express = require('express');
var ejs = require('ejs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
var homePageRouter = require('./routes/homePage');
var trainRouter = require('./routes/train');

var app = express();

// view engine setup with html
app.set('views', path.join(__dirname, 'views'));
var template = require('art-template');
template.config('base','');
template.config('extname','.html');
app.engine('.html',template.__express);
app.set('view engine','html');
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 路由导航
app.use('/', indexRouter); 
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/homePage',homePageRouter);
app.use('/train',trainRouter);

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
