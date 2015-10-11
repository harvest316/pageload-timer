/*jslint node: true */
'use strict';
var logger = require('../utils/logger');
var request = require('superagent');
var testData = require('./data');
var constants = require('../lib/constants');
var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-json-schema'));

/**
 * Tests for the test data
 */
describe('The Test Data: ', function () {

    it("sampleRequest Should Return 10 Records", function (done) {
        expect(JSON.parse(testData.sampleRequest).payload).to.have.length(10);
        done();
    });

    it("sampleResponse Should Return 7 Records", function (done) {
        expect(JSON.parse(testData.sampleResponse).response).to.have.length(7);
        done();
    });
    it("emptyResponse Should Return 0 Records", function (done) {
        expect(JSON.parse(testData.emptyResponse).response).to.have.length(0);
        done();
    });
    it("requestWithEmptyPayload Should Return Valid Fields", function (done) {
        expect(JSON.parse(testData.requestWithEmptyPayload)).to.have.property('payload');
        expect(JSON.parse(testData.requestWithEmptyPayload)).to.have.property('skip');
        expect(JSON.parse(testData.requestWithEmptyPayload)).to.have.property('take');
        expect(JSON.parse(testData.requestWithEmptyPayload)).to.have.property('totalRecords');
        expect(JSON.parse(testData.requestWithEmptyPayload).payload).to.have.length(0);
        expect(JSON.parse(testData.requestWithEmptyPayload).skip).to.equal(0);
        expect(JSON.parse(testData.requestWithEmptyPayload).take).to.equal(0);
        expect(JSON.parse(testData.requestWithEmptyPayload).totalRecords).to.equal(0);
        done();
    });
    it("requestWithJustOneShow Should Return 1 Record", function (done) {
        expect(JSON.parse(testData.requestWithJustOneShow()).payload).to.have.length(1);
        done();
    });
    it("requestWithOnlyNonDRMShows Should Return 2 Records", function (done) {
        var actual = JSON.parse(testData.requestWithOnlyNonDRMShows());
        //logger.debug(actual);
        expect(actual.payload).to.have.length(2);
        done();
    });
    it("requestWithOnlyZeroEpisodeShows Should Return 3 Records", function (done) {
        expect(JSON.parse(testData.requestWithOnlyZeroEpisodeShows()).payload).to.have.length(3);
        done();
    });
    it("requestWithOnlyValidShows Should Return 7 Records", function (done) {
        expect(JSON.parse(testData.requestWithOnlyValidShows()).payload).to.have.length(7);
        done();
    });

});