var express = require('express')
var favicon = require('serve-favicon')
var logger = require('morgan')
var path = require('path')
var redis = require('redis-url').connect()
// var router = express.Router()

var app = express()

app.set('view engine', 'jade')
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))

// no routes have been set up, so we'll capture the URL path and look that up in redis for the final URL
app.use(function (req, res, next) {
  redis.get(req.path.substr(1), function (err, target) {
    if (err) {
      res.status = 500
      res.render('error', {
        message: err.message,
        error: err
      })
      return
    }
    if (!target) {
      res.status = 404
      res.render('404', {
        key: req.path
      })
      return
    }

    // optionally add a referrer to this shortner?
    res.redirect(target)
  })
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
