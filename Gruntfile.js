module.exports = function (grunt) {

    var serveStatic = require('serve-static');
    var proxyUtil = require('grunt-connect-proxy/lib/utils');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: {
            install: {
                options: {
                    install: true,
                    copy: false,
                    targetDir: './app/libs',
                    cleanTargetDir: true
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'app/*.js', 'app/**/*.js', '!app/lib/**']
        },
        karma: {
            unit: {
                configFile: 'config/karma.conf.js',
                singleRun: true
            }
        },
        html2js: {
            dist: {
                src: ['app/**/*.html'],
                dest: 'tmp/templates.js'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['app/**/*.js', 'tmp/*.js', '!app/lib/**/*.js'],
                dest: 'dist/app.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/app.js': ['dist/app.js']
                },
                options: {
                    mangle: false
                }
            }
        },
        clean: {
            temp: {
                src: ['tmp']
            }
        },
        watch: {
            dev: {
                files: ['Gruntfile.js', 'app/**/*.js', 'app/**/*.html'],
                tasks: ['jshint', 'karma:unit', 'html2js:dist', 'concat:dist', 'clean:temp'],
                options: {
                    atBegin: true
                }
            },
            min: {
                files: ['Gruntfile.js', 'app/**/*.js', 'app/**/*.html'],
                tasks: ['jshint', 'karma:unit', 'html2js:dist', 'concat:dist', 'clean:temp', 'uglify:dist'],
                options: {
                    atBegin: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 8000,
                    middleware: function (connect, options, defaultMiddleware) {
                        var proxy = proxyUtil.proxyRequest;
                        return [
                            connect().use('/', serveStatic('app')),
                            proxy
                        ].concat(defaultMiddleware);
                    }
                }
            },
            proxies: [
                {
                    context: '/api',
                    host: 'localhost',
                    port: 8080
                },
                {
                    context: '/img',
                    host: 'localhost',
                    port: 8080
                }
            ]
        }

    });

    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('serve', ['bower', 'configureProxies:server', 'connect:server', 'watch:dev']);
    grunt.registerTask('test', ['bower', 'jshint', 'karma:unit']);
    grunt.registerTask('package', ['bower', 'jshint', 'karma:unit', 'html2js:dist', 'concat:dist', 'uglify:dist', 'clean:temp']);

};