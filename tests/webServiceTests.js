/*jslint node: true */
'use strict';
require('dotenv').load();
var logger = require('../utils/logger');
var serverURL = 'http://localhost:' + (process.env.PORT || 80);
var request = require('superagent');
var testData = require('./data');
var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-json-schema'));

/**
 * Tests for the web service
 */
describe('The Mi9 Web Service: ', function () {

    it("Should Return Mi9 Sample Response Given Mi9 Sample Request", function (done) {
        /*
         The sample request provided by Mi9 contains both wanted and unwanted shows
         The sample response provided by Mi9 contains only the wanted shows
         Wanted shows are DRM enabled with at least one episode
         */
        request.post(serverURL)
            .set('Content-Type', 'application/json')
            .send(testData.sampleRequest)
            .end(function (res) {
                expect(res.status).to.equal(200);
                expect(res.body.response).to.have.length(7);
                var show = res.body.response[0];
                expect(show).to.have.property('image');
                expect(show).to.have.property('slug');
                expect(show).to.have.property('title');
                expect(res.body.response).to.deep.equal(JSON.parse(testData.sampleResponse).response);
                done();
            });
    });

    it("Should Return Only Wanted Shows Given Only Wanted Shows", function (done) {
        request.post(serverURL)
            .set('Content-Type', 'application/json')
            .send(testData.requestWithOnlyValidShows())
            .end(function (res) {
                expect(res.status).to.equal(200);
                expect(res.body.response).to.have.length(7);
                var show = res.body.response[0];
                expect(show).to.have.property('image');
                expect(show).to.have.property('slug');
                expect(show).to.have.property('title');
                expect(JSON.stringify(res.body)).to.equal(testData.sampleResponse);
                done();
            });
    });

    it.skip("Should Return Wanted Shows 1..4 Given Mi9 Sample Request And Skip Is 0 And Take Is 4", function (done) {
        var req = JSON.stringify({
            payload: JSON.parse(testData.sampleRequest).payload,
            skip: 0,
            take: 4,
            totalRecords: 10
        });
        request.post(serverURL)
            .set('Content-Type', 'application/json')
            .send(req)
            .end(function (res) {
                expect(res.body.response).to.have.length(4);
                expect(res.status).to.equal(200);
                done();
            });
    });

    it.skip("Should Return Wanted Shows 5..7 Given Mi9 Sample Request And Skip Is 4 And Take Is 4", function (done) {
        // There are only 7 wanted shows in the sample request, so this second page should include only 3 shows.
        var req = JSON.stringify({
            payload: JSON.parse(testData.sampleRequest).payload,
            skip: 4,
            take: 4,
            totalRecords: 10
        });
        request.post(serverURL)
            .set('Content-Type', 'application/json')
            .send(req)
            .end(function (res) {
                expect(res.body.response).to.have.length(3);
                //TODO Test for shows 5,6,7 by name
                expect(res.status).to.equal(200);
                done();
            });
    });

    it("Should Return 400 Parse Error Given Skip + Take > TotalRecords", function (done) {
        var req = JSON.stringify({
            payload: testData.requestWithJustOneShow(),
            skip: 10,
            take: 10,
            totalRecords: 15
        });
        request.post(serverURL)
            .set('Content-Type', 'application/json')
            .send(req)
            .end(function (res) {
                expect(JSON.stringify(res.body)).to.equal(testData.expectedJSONParseErrorMsg);
                expect(res.status).to.equal(400);
                done();
            });
    });

    it("Should Return Single Show Given Single Wanted Show", function (done) {
        request.post(serverURL)
            .set('Content-Type', 'application/json')
            .send(testData.requestWithJustOneShow())
            .end(function (res) {
                expect(res.status).to.equal(200);
                expect(res.body.response).to.have.length(1);
                var show = res.body.response[0];
                expect(show).to.have.property('image');
                expect(show).to.have.property('slug');
                expect(show).to.have.property('title');
                expect(show).to.have.deep.property('title', '16 Kids and Counting');
                done();
            });
    });

    it("Should Return Empty Response Given Single Unwanted Show", function (done) {
        request.post(serverURL)
            .set('Content-Type', 'application/json')
            .send(testData.requestWithJustOneShow())
            .end(function (res) {
                expect(res.status).to.equal(200);
                expect(res.body.response).to.have.length(1);
                var show = res.body.response[0];
                expect(show).to.have.property('image');
                expect(show).to.have.property('slug');
                expect(show).to.have.property('title');
                expect(show).to.have.deep.property('title', '16 Kids and Counting');
                done();
            });
    });

    it("Should Return Empty Response Given Only Zero-Episode Shows", function (done) {
        request.post(serverURL)
            .set('Content-Type', 'application/json')
            .send(testData.requestWithOnlyZeroEpisodeShows())
            .end(function (res) {
                expect(res.status).to.equal(200);
                expect(res.body).to.deep.equal(JSON.parse(testData.emptyResponse));
                done();
            });
    });

    it("Should Return Empty Response Given Only Non-DRM Shows", function (done) {
        request.post(serverURL)
            .set('Content-Type', 'application/json')
            .send(testData.requestWithOnlyNonDRMShows())
            .end(function (res) {
                expect(res.status).to.equal(200);
                expect(res.body).to.deep.equal(JSON.parse(testData.emptyResponse));
                done();
            });
    });

    it("Should Return 404 Not Found Given Unknown Path", function (done) {
        request.post(serverURL + "/invalidPath").end(function (res) {
            expect(res.status).to.equal(404);
            done();
        });
    });

    it("Should Return 400 Parse Error Given Missing Request", function (done) {
        request.post(serverURL).end(function (res) {
            expect(JSON.stringify(res.body)).to.equal(testData.expectedJSONParseErrorMsg);
            expect(res.status).to.equal(400);
            done();
        });
    });

    it("Should Return 400 Parse Error Given Null Request", function (done) {
        request.post(serverURL)
            .set('Content-Type', 'application/json')
            .send(null)
            .end(function (res) {
                expect(JSON.stringify(res.body)).to.equal(testData.expectedJSONParseErrorMsg);
                expect(res.status).to.equal(400);
                done();
            });
    });

    it("Should Return 400 Parse Error Given Empty JSON Request", function (done) {
        request.post(serverURL)
            .set('Content-Type', 'application/json')
            .send({})
            .end(function (res) {
                expect(JSON.stringify(res.body)).to.equal(testData.expectedJSONParseErrorMsg);
                expect(res.status).to.equal(400);
                done();
            });
    });

    it("Should Return 400 Parse Error Given Empty String Request", function (done) {
        request.post(serverURL)
            .set('Content-Type', 'application/json')
            .send('')
            .end(function (res) {
                expect(JSON.stringify(res.body)).to.equal(testData.expectedJSONParseErrorMsg);
                expect(res.status).to.equal(400);
                done();
            });
    });

    it("Should Return 400 Parse Error Given Empty Payload", function (done) {
        request.post(serverURL)
            .set('Content-Type', 'application/json')
            .send(testData.requestWithEmptyPayload)
            .end(function (res) {
                expect(JSON.stringify(res.body)).to.equal(testData.expectedJSONParseErrorMsg);
                expect(res.status).to.equal(400);
                done();
            });
    });

    it("Should Return 400 Parse Error Given Invalid Schema", function (done) {
        request.post(serverURL)
            .set('Content-Type', 'application/json')
            .send({payloads: [], name: "invalid"})
            .end(function (res) {
                expect(JSON.stringify(res.body)).to.equal(testData.expectedJSONParseErrorMsg);
                expect(res.status).to.equal(400);
                done();
            });
    });

    it("Should Return 400 Parse Error Given Invalid MIME Type", function (done) {
        request.post(serverURL)
            .set('Content-Type', 'text/plain')
            .send(testData.sampleRequest)
            .end(function (res) {
                expect(JSON.stringify(res.body)).to.equal(testData.expectedJSONParseErrorMsg);
                expect(res.status).to.equal(400);
                done();
            });
    });

    it("Should Return 400 Parse Error Given Non-JSON Request", function (done) {
        request.post(serverURL)
            .set('Content-Type', 'application/json')
            .send("invalid text")
            .end(function (res) {
                expect(JSON.stringify(res.body)).to.equal(testData.expectedJSONParseErrorMsg);
                expect(res.status).to.equal(400);
                done();
            });
    });

});