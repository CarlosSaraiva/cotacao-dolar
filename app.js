var express = require('express');
var socket_io = require("socket.io");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


//routes
var routes = require('./routes/index');
var cotacao = require('./routes/cotacao');
var uf = require('./routes/uf');

//Express
var app = express();

//Socket.io
var io = socket_io();
app.io = io;

//Serving static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/angular', express.static(path.join(__dirname, 'public/js/angular')));
app.use('/bower', express.static(path.join(__dirname, 'bower_components')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use('/', routes);
app.use('/cotacao', cotacao);
app.use('/uf', uf);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;