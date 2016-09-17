var express = require('express'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    path = require('path');

// Routes.
var routes = require('./routes/index');
var countries = require('./routes/countries');

// Create Express instance.
var app = express();

// Define middleware.
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Set routes.
app.use('/', routes);
app.use('/api/countries', countries);

// Error handlers.
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.end(JSON.stringify({
        message: err.message,
        error: {}
    }));
});

module.exports = app;