/*jslint node: true */
'use strict';
var fs = require('fs');
var path = require('path');
var winston = require('winston');
var pjson = require('../package.json');
var logDir = "logs";
var env = process.env.NODE_ENV || 'development';
var transports = [];

/* Define colours for error level highlighting */
var colours = {
    debug: 'yellow',
    verbose: 'green',
    info: 'cyan',
    warn: 'magenta',
    error: 'red'
};
winston.addColors(colours);

/* Create log directory if missing */
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

/* Output everything to screen */
transports.push(new (winston.transports.Console)({level: 'none', colorize: true, 'timestamp': false}));

/* Write to daily log file, using less detail in production */
winston.add(require('winston-daily-rotate-file'), {
    name: 'file',
    json: false,
    filename: path.join(logDir, pjson.name),
    datePattern: '.yyyy-MM-dd.txt',
    level: env === 'development' ? 'debug' : 'info'
});

var logger = new winston.Logger({transports: transports});
module.exports = logger;