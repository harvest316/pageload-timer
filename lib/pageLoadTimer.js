/*jslint node: true */
'use strict';
var logger = require('../utils/logger');
var constants = require('../lib/constants'); // for the required JSON parsing error message
var async = require('async'); // enables faster responses for large payloads
var request = require('./request.js');
var plt = require('pagelt');

var pageLoadTimer = (function () {

    return {
        /**
         * Returns the loading times for the given URLs
         * @param req
         * @param callback
         */
        get: function (req, callback) {
            var pageLoadTimes = [];

            function measureSinglePageLoad(targetURL, done) {
                logger.info('Timing Pageload ' + targetURL);
                plt(targetURL, function (err, latency) {
                    if (err) {
                        if (err.message.indexOf('ENOTFOUND') !== -1) {
                            done(constants.notFoundErrorMsg + targetURL, null);
                        } else {
                            done(err.message, null);
                        }
                    } else {
                        pageLoadTimes.push({url: targetURL, latency_ms: latency.ms});
                        done();
                    }
                });
            }

            if (request.isValid(JSON.stringify(req))) {
                // Loop through all URLs
                async.forEach(req.payload, measureSinglePageLoad, function (err) {
                    if (err) {
                        logger.error('Exception (pageLoadTimer.get): ', err);
                        callback(err, null);
                    } else {
                        callback(null, pageLoadTimes); // success
                    }
                });
            } else {
                callback(constants.parseErrorMsg, null); // the required error message
            }
        }
    };
}());

exports = module.exports = pageLoadTimer;


