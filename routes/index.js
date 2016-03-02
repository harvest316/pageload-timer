/*jslint node: true */
'use strict';
var logger = require('../utils/logger');
var pageLoadTimer = require('../lib/pageLoadTimer');
var constants = require('../lib/constants');
var express = require('express');
var router = express.Router();

/**
 * A simple router
 */
router.post('/', function (req, res) {

    pageLoadTimer.get(req.body, function (err, pageLoadTimes) {
        if (!err) {
            res.status(200).json({response: pageLoadTimes});
        } else {
            logger.debug("Error Handler (index.js): " + err);
            if (err.indexOf("invalid json") !== -1 ||
                err.indexOf("Unexpected token") !== -1 ||
                err.indexOf(constants.parseErrorMsg) !== -1) {
                    // return expected parsing error for invalid JSON
                    logger.error('Parsing Error (400): ' + err);
                    res.status(400).json({error: constants.parseErrorMsg});
            } else if (err.indexOf(constants.notFoundErrorMsg) !== -1) {
                // return expected Not Found Error
                logger.error('Not Found Error (404): ' + err);
                res.status(404).json({error: constants.notFoundErrorMsg});
            } else {
                // all other errors return HTTP code 500 with raw error message
                logger.error('Other Error (500): ' + err);
                logger.error((new Date()).toUTCString() + ' Error: ', err);
                logger.error(err.stack);
                res.status(500).json({error: err});
            }
            err = "";
        }
    });
});

module.exports = router;
