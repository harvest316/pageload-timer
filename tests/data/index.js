/*jslint node: true */
'use strict';
var _ = require('underscore');
var sampleRequestJSON = require('./sample_request.json');
var sampleResponseJSON = require('./sample_response.json');
var constants = require('../../lib/constants');

/**
 * Test Data Provider
 */
var testData = (function () {

    return {
        sampleRequest: JSON.stringify(sampleRequestJSON),
        sampleResponse: JSON.stringify(sampleResponseJSON),
        emptyRequest: JSON.stringify({payload: []}),
        emptyResponse: JSON.stringify({response: []}),
        expectedJSONParseErrorMsg: JSON.stringify({error: constants.parseErrorMsg}),
        expectedNotFoundErrorMsg: JSON.stringify({error: constants.notFoundErrorMsg})
    };

}());

exports = module.exports = testData;
