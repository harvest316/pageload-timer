/*jslint node: true */
'use strict';
var logger = require('../utils/logger');
var constants = require('../lib/constants'); // for the required JSON parsing error message
var async = require('async'); // enables faster responses for large payloads
var request = require('./request.js');

/**
 * The core of the web service is this filter, which removes any shows with no DRM or Episodes.
 */
var filter = (function () {
    return {

        /**
         * Returns just the shows with DRM and at least one Episode
         * @param req
         * @param callback
         */
        getShowsWithDRMAndEpisodes: function (req, callback) {
            var filteredShows = [];
            if (request.isValid(req)) {
                //Find DRM-enabled shows having one or more episodes
                async.forEach(req.payload, function (show, callback) {
                    //TODO Refactor using async.whilst to allow paged reads using skip & take.
                    if (show.drm === true && show.episodeCount > 0) {
                        filteredShows.push({image: show.image.showImage, slug: show.slug, title: show.title});
                        callback();
                    } else {
                        callback();
                    }
                }, function (err) { // final
                    if (err) { // treat all exceptions as parsing error
                        logger.error((new Date()).toUTCString() + ' Error in getShowsWithDRMAndEpisodes loop:', err.message);
                        logger.error(err.stack);
                        callback(constants.parseErrorMsg, null); // the required error message
                    } else {
                        callback(null, filteredShows); // success
                    }
                });
            } else {
                callback(constants.parseErrorMsg, null); // the required error message
            }

        }
    };

}());

exports = module.exports = filter;


