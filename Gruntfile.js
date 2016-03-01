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
                src: ['./*.js', './bin/www', './lib/*.js', './routes/*.js', './utils/*.js', './tests/*.js', './tests/data/*.js', './README.md', './coverage/lcov-report/index.html'],
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
            //coveralls: {
            //    src: ['tests'], // multiple folders also works
            //    options: {
            //        coverage: true, // this will make the grunt.event.on('coverage') event listener to be triggered
            //        check: {
            //            lines: 75,
            //            statements: 75
            //        },
            //        root: './lib', // define where the cover task should consider the root of libraries that are covered by tests
            //        reportFormats: ['lcov']
            //    }
            //}
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

            upload: {
                // LCOV coverage file (can be string, glob or array)
                src: 'coverage/lcov.info',
                options: {}
            }
        }
    });

    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-coveralls');

    //grunt.event.on('coverage', function(lcov, done){
    //    require('coveralls').handleInput(lcov, function(err){
    //        if (err) {
    //            return done(err);
    //        }
    //        done();
    //    });
    //});

    grunt.registerTask('default', ['simplemocha', 'jsdoc', 'mocha_istanbul', 'coveralls']);
};