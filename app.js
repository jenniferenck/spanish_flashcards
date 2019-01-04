/**Express app for spanish flashcards */

const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');

const app = express();

// Parse body for urlencoded (non-JSON) data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

nunjucks.configure('templates', {
  autoescape: true,
  express: app
});

/** routes */

const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

// Generate page for registration form:
app.get('/', async function(req, res, next) {
  try {
    return res.render('base.html');
  } catch (error) {
    return next(error);
  }
});

/** 404 catch --- passes to next handler. */

app.get('*', function(req, res, next) {
  const err = new Error('Not Found');
  console.log(err, 'error from middleware *');
  err.status = 404;

  // pass the error to the next piece of middleware
  return next(err); // passes the error to Express
});

/** Global error handler. */

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  return res.json({
    status: err.status,
    message: err.message
  });
});

module.exports = app;
