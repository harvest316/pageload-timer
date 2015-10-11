/*jslint node: true */
'use strict';
var _ = require('underscore');
var sampleRequestJSON = require('./sample_request.json');
var sampleResponseJSON = require('./sample_response.json');
var constants = require('../../lib/constants');
var logger = require('../../utils/logger');

/**
 * Test Data Provider
 */
var testData = (function () {

    /**
     * Generates a well-formed request
     * @param payload
     * @returns {*}
     */
    function formatRequest(payload) {
        return JSON.stringify({
            payload: payload,
            skip: 0,
            take: payload.length,
            totalRecords: payload.length
        });
    }

    /**
     * Extracts shows from sample request that match the given filter
     * @param filterFunction
     * @returns {*}
     */
    function getShows(filterFunction) {
        return _.select(sampleRequestJSON.payload, filterFunction);
    }

    return {
        sampleRequest: JSON.stringify(sampleRequestJSON),
        sampleResponse: JSON.stringify(sampleResponseJSON),
        emptyResponse: JSON.stringify({response: []}),
        requestWithEmptyPayload: formatRequest([]),
        requestWithJustOneShow: function () {
            return formatRequest([sampleRequestJSON.payload[0]]);
        },
        requestWithOnlyNonDRMShows: function () {
            return formatRequest(getShows(function (show) {
                return show.drm !== true;
            }));
        },
        requestWithOnlyZeroEpisodeShows: function () {
            return formatRequest(getShows(function (show) {
                return (show.episodeCount || 0) < 1;
            }));
        },
        requestWithOnlyValidShows: function () {
            return formatRequest(getShows(function (show) {
                return show.episodeCount > 0 && show.drm === true;
            }));
        },
        expectedJSONParseErrorMsg: JSON.stringify({error: constants.parseErrorMsg})
    };

}());

exports = module.exports = testData;
