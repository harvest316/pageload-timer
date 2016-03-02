'use strict';

module.exports = function (grunt) { // jshint ignore:line

    grunt.initConfig({
        env: {
            dev: {
                NODE_ENV: 'development',
                SERVER: 'http://localhost:',
                PORT: 80
            },
            build: {
                NODE_ENV: 'production',
                SERVER: 'http://pageload-timer.herokuapp.com:',
                PORT: 5000
            }
        },
        simplemocha: {
            options: {
                globals: ['expect'],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'tap'
            },
            all: {src: ['./tests/*.test.js']}
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
        },
        exec: {
            readme: {
                command: 'readme package.json --tests --travis > README.md'
            }
        },
        mocha_istanbul: {
            coverage: {
                src: 'tests', // a folder works nicely
                options: {
                    mask: '*.test.js'
                }
            }
        },
        istanbul_check_coverage: {
            default: {
                options: {
                    coverageFolder: 'coverage', // will check both coverage folders and merge the coverage results
                    check: {
                        lines: 80,
                        statements: 80
                    }
                }
            }
        },
        coveralls: {
            options: {
                // When true, grunt-coveralls will only print a warning rather than
                // an error, to prevent CI builds from failing unnecessarily (e.g. if
                // coveralls.io is down). Optional, defaults to false.
                force: false
            },
            grunt_coveralls_real_coverage: {
                src: 'coverage/lcov.info'
            }
        }
    });

    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-coveralls');

    grunt.registerTask('default', ['jsdoc', 'mocha_istanbul', 'coveralls']);
};