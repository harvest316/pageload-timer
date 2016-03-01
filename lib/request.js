/*jslint node: true */
'use strict';
var logger = require('../utils/logger');
var validUrl = require('valid-url');

/**
 * Library functions for Requests
 */
var request = (function () {
    return {

        /**
         * Validates the request schema
         * @param jsonString
         * @returns {boolean}
         */
        isValid: function (jsonString) {
            logger.info('Validating JSON Request: ' + jsonString);
            var valid = true;
            try {
                var json = JSON.parse(jsonString);
                if (!json.hasOwnProperty("payload")) {
                    logger.warn('Missing Payload');
                    valid = false;
                } else if (json.payload.length <= 0) {
                    logger.warn('Empty Payload');
                    valid = false;
                } else {
                    json.payload.forEach(function (url) {
                        if (typeof url !== "string") {
                            logger.warn('Not a String: ' + url);
                            valid = false;
                        } else {
                            if (!validUrl.isUri(url)) {
                                logger.warn('Not a URI: ' + url);
                                valid = false;
                            }
                        }
                    });
                }
            } catch (err) {
                logger.error('Error in request.isValid: ' + err.message);
                valid = false;
            }
            return valid;
        }
    };

}());

exports = module.exports = request;
