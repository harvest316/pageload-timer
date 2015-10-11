/*jslint node: true */
'use strict';
var logger = require('../utils/logger');

/**
 * Library functions for Requests
 */
var request = (function () {
    return {

        /**
         * Validates the request schema
         * @param json
         * @returns {boolean}
         */
        isValid: function (json) {
            if (json.hasOwnProperty("payload") && json.hasOwnProperty("skip")) {
                if (json.hasOwnProperty("take") && json.hasOwnProperty("totalRecords")) {
                    return json.payload.length > 0 && json.skip + json.take <= json.totalRecords;
                }
            }
            return false;
        }
    };

}());

exports = module.exports = request;
