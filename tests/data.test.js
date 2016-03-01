/*jslint node: true */
'use strict';
var logger = require('../utils/logger');
var testData = require('./data');
var request = require('../lib/request');
var response = require('../lib/response');
var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-json-schema'));

/**
 * Tests for the test data
 */
describe('The Test Data: ', function () {

    it("sampleRequest Should Return 4 String Elements", function (done) {
        var json = JSON.parse(testData.sampleRequest);
        expect(json.payload).to.have.length(4);
        expect(typeof json.payload[0]).to.be.string;
        expect(typeof json.payload[1]).to.be.string;
        expect(typeof json.payload[2]).to.be.string;
        expect(typeof json.payload[3]).to.be.string;
        //TODO Change to forEach
        done();
    });

    it("Request.isValid Should Return True Given sampleRequest", function (done) {
        expect(request.isValid(testData.sampleRequest)).to.be.true;
        done();
    });

    it("Request.isValid Should Return False Given emptyRequest", function (done) {
        expect(request.isValid(testData.emptyRequest)).to.be.false;
        done();
    });

    it("Response.isValid Should Return True Given sampleResponse", function (done) {
        expect(response.isValid(testData.sampleResponse)).to.be.true;
        done();
    });

    it("Response.isValid Should Return False Given emptyResponse", function (done) {
        expect(response.isValid(testData.emptyResponse)).to.be.false;
        done();
    });

    it("sampleResponse Should Contain Same URLs As sampleRequest", function (done) {
        var req = JSON.parse(testData.sampleRequest),
            res = JSON.parse(testData.sampleResponse);
        expect(req.payload).to.have.length(4);
        expect(res.response).to.have.length(4);
        expect(res.response[0].url).to.be.oneOf(req.payload);
        expect(res.response[1].url).to.be.oneOf(req.payload);
        expect(res.response[2].url).to.be.oneOf(req.payload);
        expect(res.response[3].url).to.be.oneOf(req.payload);
        //TODO Change to forEach
        done();
    });

});