/*jslint node: true */
'use strict';
var logger = require('../utils/logger');
//var serverURL = 'http://localhost:' + (process.env.PORT || 80);
var serverURL = 'http://pageload-timer.herokuapp.com:' + (process.env.PORT || 80);
var app = require('../app');
var request = require('superagent');
var response = require('../lib/response');
var testData = require('./data');
var constants = require('../lib/constants');
var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-json-schema'));

var server = app.listen(process.env.PORT || 80, function () {
    logger.debug('Express server listening on port ' + server.address().port);
});

/**
 * Tests for the web service
 */
describe('The Pageload Timer Web Service: ', function () {

    it("Should Return 4 Valid Timing Records Given Sample Request", function (done) {
        this.timeout(10000);
        request.post(serverURL)
            .type('application/json')
            .send(testData.sampleRequest)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res.ok).to.equal(true);
                //TODO expect response Content-Type = application/json;
                expect(response.isValid(JSON.stringify(res.body))).to.be.true;
                expect(res.body.response).to.have.length(4);
                var req = JSON.parse(testData.sampleRequest);
                expect(res.body.response[0].url).to.be.oneOf(req.payload);
                expect(res.body.response[1].url).to.be.oneOf(req.payload);
                expect(res.body.response[2].url).to.be.oneOf(req.payload);
                expect(res.body.response[3].url).to.be.oneOf(req.payload);
                //TODO Change to forEach
                done();
            });
    });

    it("Should Return Single Response Given Single Existing URL", function (done) {
        var validUrl = 'http://www.google.com/';
        request.post(serverURL)
            .type('application/json')
            .send({payload: [validUrl]})
            .end(function (err, res) {
                expect(res.ok).to.equal(true);
                expect(res.status).to.equal(200);
                expect(res.body.response).to.have.length(1);
                expect(res.body.response[0]).to.have.property('url');
                expect(res.body.response[0]).to.have.property('latency_ms');
                expect(res.body.response[0].url).to.be.validUrl;
                done();
            });
    });

    it("Should Return 404 Not Found Given Well-Formed Non-Existing URL", function (done) {
        request.post(serverURL)
            .type('application/json')
            .send({payload: ['http://highly-unlikely-71863916278.co.nz']})
            .end(function (err, res) {
                expect(JSON.stringify(res.body)).to.contain(constants.notFoundErrorMsg);
                expect(res.status).to.equal(404);
                expect(res.ok).to.equal(false);
                done();
            });
    });

    it("Should Return 404 Not Found Given Invalid TLD", function (done) {
        request.post(serverURL)
            .type('application/json')
            .send({payload: ['http://www.test.invalidTLD/']})
            .end(function (err, res) {
                expect(JSON.stringify(res.body)).to.contain(constants.notFoundErrorMsg);
                expect(res.status).to.equal(404);
                expect(res.ok).to.equal(false);
                done();
            });
    });

    it("Should Return 400 Parse Error Given Invalid Schema", function (done) {
        request.post(serverURL)
            .type('application/json')
            .send({payloads: [], name: "invalid"})
            .end(function (err, res) {
                expect(JSON.stringify(res.body)).to.equal(testData.expectedJSONParseErrorMsg);
                expect(res.status).to.equal(400);
                expect(res.ok).to.equal(false);
                done();
            });
    });

    it("Should Return 400 Parse Error Given Invalid MIME Type", function (done) {
        request.post(serverURL)
            .type('text/plain')
            .send(testData.sampleRequest)
            .end(function (err, res) {
                expect(res.ok).to.equal(false);
                expect(JSON.stringify(res.body)).to.equal(testData.expectedJSONParseErrorMsg);
                expect(res.status).to.equal(400);
                done();
            });
    });

    it("Should Return 400 Parse Error Given Non-JSON Request", function (done) {
        request.post(serverURL)
            .type('application/json')
            .send("invalid text")
            .end(function (err, res) {
                expect(res.ok).to.equal(false);
                expect(JSON.stringify(res.body)).to.equal(testData.expectedJSONParseErrorMsg);
                expect(res.status).to.equal(400);
                done();
            });
    });

    it("Should Return 404 Not Found Given Invalid POST Path", function (done) {
        request.post(serverURL + "/invalidPath").end(function (err, res) {
            expect(res.ok).to.equal(false);
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal(constants.routeNotFoundErrorMsg);
            done();
        });
    });

    it("Should Return 400 Parse Error Given Missing Request", function (done) {
        request.post(serverURL).end(function (err, res) {
            expect(res.ok).to.equal(false);
            expect(JSON.stringify(res.body)).to.equal(testData.expectedJSONParseErrorMsg);
            expect(res.status).to.equal(400);
            done();
        });
    });

    it("Should Return 400 Parse Error Given Null Request", function (done) {
        request.post(serverURL)
            .type('application/json')
            .send(null)
            .end(function (err, res) {
                expect(res.ok).to.equal(false);
                expect(JSON.stringify(res.body)).to.equal(testData.expectedJSONParseErrorMsg);
                expect(res.status).to.equal(400);
                done();
            });
    });

    it("Should Return 400 Parse Error Given Empty JSON Request", function (done) {
        request.post(serverURL)
            .type('application/json')
            .send({})
            .end(function (err, res) {
                expect(res.ok).to.equal(false);
                expect(JSON.stringify(res.body)).to.equal(testData.expectedJSONParseErrorMsg);
                expect(res.status).to.equal(400);
                done();
            });
    });

    it("Should Return 400 Parse Error Given Empty String Request", function (done) {
        request.post(serverURL)
            .type('application/json')
            .send('')
            .end(function (err, res) {
                expect(res.ok).to.equal(false);
                expect(JSON.stringify(res.body)).to.equal(testData.expectedJSONParseErrorMsg);
                expect(res.status).to.equal(400);
                done();
            });
    });

    it("Should Return 400 Parse Error Given Empty Payload", function (done) {
        request.post(serverURL)
            .type('application/json')
            .send(testData.emptyRequest)
            .end(function (err, res) {
                expect(res.ok).to.equal(false);
                expect(JSON.stringify(res.body)).to.equal(testData.expectedJSONParseErrorMsg);
                expect(res.status).to.equal(400);
                done();
            });
    });

    after(function () {
        server.close();
        logger.debug('Express server is now closed.');
    });
});

/**
 * Last-ditch Error Handler (main is in app.js)
 */
process.on('uncaughtException', function (err) {
    logger.error('Uncaught Exception (app.test.js):', err);
    // let it die because it will be restarted
});