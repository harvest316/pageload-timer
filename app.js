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
    logger.error('Route Not Found');
    res.status(404).json({error: constants.routeNotFoundErrorMsg});
});

/**
 * Main Error Handler
 */
app.use(function (err, req, res, next) {
    logger.debug("Main Error Handler (app.js): " + err.message);
    if (err.message.indexOf("invalid json") !== -1 ||
        err.message.indexOf("Unexpected token") !== -1 ||
        err.message.indexOf(constants.parseErrorMsg) !== -1) {
            // return expected parsing error for invalid JSON
            logger.error('Parsing Error (400): ' + err.message);
            res.status(400).json({error: constants.parseErrorMsg});
    } else {
        // all other errors return HTTP code 500 with raw error message
        logger.error('Other Error (500): ' + err.message);
        logger.error(err.stack);
        res.status(500).json({error: err.message});
    }
});

module.exports = app;
