/*jslint node: true */
'use strict';

var filter = require('../lib/filter');
var express = require('express');
var router = express.Router();

/**
 * A simple router
 */
router.post('/', function (req, res) {

    filter.getShowsWithDRMAndEpisodes(req.body, function (err, filteredShows) {
        if (!err) {
            res.status(200).json({response: filteredShows});
        } else {
            res.status(400).json({error: err});
        }
    });

});

module.exports = router;
