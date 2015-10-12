'use strict';

module.exports = function (grunt) { // jshint ignore:line

    grunt.initConfig({
        simplemocha: {
            options: {
                globals: ['expect'],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'tap'
            },
            all: {src: ['./tests/*.js']}
        },
        jsdoc: {
            dist: {
                src: ['./*.js', './bin/www', './lib/*.js', './routes/*.js', './utils/*.js', './tests/*.js', './tests/data/*.js', './README.md'],
                jsdoc: './node_modules/.bin/jsdoc',
                options: {
                    destination: 'doc',
                    configure: './jsdoc/conf.json'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('default', ['simplemocha', 'jsdoc']);
};