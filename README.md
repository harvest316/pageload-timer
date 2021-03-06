Pageload-Timer
==============
> A web service template written in NodeJS with the Express.js web framework.
> Downloads a given list of web pages, and returns an array of their pageload latencies in milliseconds.
> Demonstrates various development best practices, including self-documenting BDD unit tests in Mocha Chai & Expect.js.
> Continuously Deployed on Heroku ExpressJS with Grunt & Travis CI.
> More at http://harvest316.github.io/pageload-timer/

[![Build Status](https://travis-ci.org/harvest316/pageload-timer.png?branch=master)](https://travis-ci.org/harvest316/pageload-timer) 
[![Coverage Status](https://coveralls.io/repos/github/harvest316/pageload-timer/badge.svg?branch=master)](https://coveralls.io/github/harvest316/pageload-timer?branch=master)

## Sample Request
```json
{
    "payload": [
            "http://www.google.com",
            "https://www.facebook.com:443",
            "https://twitter.com",
            "http://www.xkcd.com/443?foo=bar"
    ]
}
```

## Sample Response
```json
{
    "response": [
        {
            "url": "http://www.google.com",
            "latency_ms": 3210
        },
        {
            "url": "https://www.facebook.com:443",
            "latency_ms": 1232
        },
        {
            "url": "https://twitter.com",
            "latency_ms": 315
        },
        {
            "url": "http://www.xkcd.com/443?foo=bar",
            "latency_ms": 132
        }
    ]
}
```

## Object Diagram
![alt tag](https://cdn.rawgit.com/harvest316/pageload-timer/master/pageload-timer.svg)


## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

```sh
npm install pageload-timer --save
```


## Tests

```
  The Pageload Timer Web Service: 
    √ Should Return 4 Valid Timing Records Given Sample Request (2802ms)
    √ Should Return Single Response Given Single Existing URL (1788ms)
    √ Should Return 404 Not Found Given Well-Formed Non-Existing URL (387ms)
    √ Should Return 404 Not Found Given Invalid TLD (383ms)
    √ Should Return 400 Parse Error Given Invalid Schema
    √ Should Return 400 Parse Error Given Invalid MIME Type
    √ Should Return 400 Parse Error Given Non-JSON Request
    √ Should Return 404 Not Found Given Invalid POST Path
    √ Should Return 400 Parse Error Given Missing Request
    √ Should Return 400 Parse Error Given Null Request
    √ Should Return 400 Parse Error Given Empty JSON Request
    √ Should Return 400 Parse Error Given Empty String Request
    √ Should Return 400 Parse Error Given Empty Payload
  The Test Data: 
    √ sampleRequest Should Return 4 String Elements
    √ Request.isValid Should Return True Given sampleRequest
    √ Request.isValid Should Return False Given emptyRequest
    √ Response.isValid Should Return True Given sampleResponse
    √ Response.isValid Should Return False Given emptyResponse
    √ sampleResponse Should Contain Same URLs As sampleRequest
  19 passing (5s)

```

## Documentation
System Internals are documented using [JSDoc here](https://cdn.rawgit.com/harvest316/pageload-timer/master/doc/index.html).

## Dependencies

- [async](https://github.com/caolan/async): Higher-order functions and common patterns for asynchronous code
- [body-parser](https://github.com/expressjs/body-parser): Node.js body parsing middleware
- [express](https://github.com/expressjs/express): Fast, unopinionated, minimalist web framework
- [pagelt](https://github.com/zrrrzzt/pagelt): Measure time to load a page
- [superagent](https://github.com/visionmedia/superagent): elegant &amp; feature rich browser / node HTTP with a fluent API
- [underscore](https://github.com/jashkenas/underscore): JavaScript&#39;s functional programming helper library.
- [valid-url](https://github.com/ogt/valid-url): URI validation functions
- [winston](https://github.com/winstonjs/winston): A multi-transport async logging library for Node.js
- [winston-daily-rotate-file](https://github.com/winstonjs/winston-daily-rotate-file): A transport for winston which logs to a rotating file each day.

## Dev Dependencies

- [accepts](https://github.com/jshttp/accepts): Higher-level content negotiation
- [chai](https://github.com/chaijs/chai): BDD/TDD assertion library for node.js and the browser. Test framework agnostic.
- [chai-json-schema](https://github.com/Bartvds/chai-json-schema): Chai plugin for JSON Schema v4
- [debug](https://github.com/visionmedia/debug): small debugging utility
- [expect.js](https://github.com/LearnBoost/expect.js): BDD style assertions for node and the browser.
- [grunt](https://github.com/gruntjs/grunt): The JavaScript Task Runner
- [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint): Validate files with JSHint
- [grunt-env](https://github.com/jsoverson/grunt-env): Specify an ENV configuration for future tasks in the chain
- [grunt-exec](https://github.com/jharding/grunt-exec): Grunt task for executing shell commands.
- [grunt-jsdoc](https://github.com/krampstudio/grunt-jsdoc): Integrates jsdoc3 generation into your Grunt build
- [grunt-simple-mocha](https://github.com/yaymukund/grunt-simple-mocha): A simple wrapper for running tests with Mocha.
- [jsdoc](https://github.com/jsdoc3/jsdoc): An API documentation generator for JavaScript.
- [mocha](https://github.com/mochajs/mocha): simple, flexible, fun test framework
- [superagent](https://github.com/visionmedia/superagent): elegant &amp; feature rich browser / node HTTP with a fluent API


## License

MIT

_Generated by [package-json-to-readme](https://github.com/zeke/package-json-to-readme)_
