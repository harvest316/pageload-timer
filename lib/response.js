/*jslint node: true */
'use strict';
var logger = require('../utils/logger');
var validUrl = require('valid-url');

/**
 * Library functions for Responses
 */
var response = (function () {
    return {

        /**
         * Validates the response schema
         * @param jsonString
         * @returns {boolean}
         */
        isValid: function (jsonString) {
            logger.info('Validating JSON Response: ' + jsonString);
            var valid = true;
            try {
                var json = JSON.parse(jsonString);
                if (!json.hasOwnProperty("response")) {
                    logger.warn('Missing Payload');
                    valid = false;
                } else if (json.response.length <= 0) {
                    logger.warn('Empty Response');
                    valid = false;
                } else {
                    json.response.forEach(function (record) {
                        if (typeof record.url !== "string") {
                            logger.warn('Not a String: ' + url);
                            valid = false;
                        } else if (!validUrl.isUri(record.url)) {
                            logger.warn('Not a URI: ' + record.url);
                            valid = false;
                        }
                        if (typeof record.latency_ms !== "number") {
                            logger.warn('Not a Number: ' + record.latency_ms);
                            valid = false;
                        } else if (record.latency_ms <= 0) {
                            logger.warn('Not above Zero: ' + record.latency_ms);
                            valid = false;
                        }
                    });
                }
            } catch (err) {
                logger.error('Error in response.isValid: ' + err.message);
                valid = false;
            }
            return valid;
        }
    };

}());

exports = module.exports = response;
