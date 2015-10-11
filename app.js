/*jslint node: true */
'use strict';
var logger = require('./utils/logger');
var express = require('express');
var constants = require('./lib/constants');
var routes = require('./routes/index');
var bodyParser = require('body-parser');

/**
 * The central app object
 */
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/**
 * Handler for the expected root path
 */
app.use('/', routes);

/**
 * Handler for invalid paths
 */
app.use(function (req, res, next) {
    // return HTTP code 404 Not Found
    res.status(404).json({error: 'Not Found'});
});

/**
 * Main Error Handler
 */
app.use(function (err, req, res, next) {
    if (err.message.indexOf("invalid json") !== -1) {
        // return expected parsing error for invalid JSON
        res.status(400).json({error: constants.parseErrorMsg});
    } else {
        // all other errors return HTTP code 500
        logger.error((new Date()).toUTCString() + ' Error: ', err.message);
        logger.error(err.stack);
        res.status(500).json({error: err.message});
    }
});

module.exports = app;
