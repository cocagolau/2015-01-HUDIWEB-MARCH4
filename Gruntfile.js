module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //vars
        dirs: { 
            src    : 'websrc',
            js     : 'js',
            jsLib  : 'js/lib',
            css    : 'css',
            cssLib : 'css/lib',
            less   : 'less',
            dist   : 'webapp',
            jsp    : 'webapp/WEB-INF/jsp'
        },
        fileNames: {
            bower : '_bower'
        },
        encoding : 'UTF-8',
        

        //tasks
        clean: {
            all: [
                '**/_bower*.*',
                '<%= dirs.src %>/<%= dirs.jsLib %>/**/*',
                '<%= dirs.src %>/<%= dirs.cssLib %>/**/*'
            ]
        },

        bower_concat: {
            all: {
                dest: '<%= dirs.src %>/<%= dirs.jsLib %>/<%= fileNames.bower %>.js',
                cssDest: '<%= dirs.src %>/<%= dirs.cssLib %>/<%= fileNames.bower %>.css'
            }
        },

        jshint: {
            options: {
                force : true
            },
            all: [
                'Gruntfile.js',
                '<%= dirs.src %>/<%= dirs.js %>/*.js'
            ]
        },

        template: {
            src: {
                options: {
                    data: {
                        jsLibFile : '<%= fileNames.bower %>.js',
                        jsLibDir  : '<%= dirs.jsLib %>',
                        jsDir     : '<%= dirs.js %>',
                        cssLibDir : '<%= dirs.cssLib %>',
                        cssDir    : '<%= dirs.css %>',
                        encoding  : '<%= encoding %>',
                        title     : 'march4',
                        jspHeader : ''
                    }
                },
                files: [{
                    expand: true,
                    cwd: '.',
                    src: ['**/*.tpl.html'],
                    dest: '.',
                    ext: '.html'
                }],
            },

            dev: {
                options: {
                    data: {
                        jsLibFile : '/<%= fileNames.bower %>.js',
                        jsLibDir  : '/<%= dirs.jsLib %>',
                        jsDir     : '/<%= dirs.js %>',
                        cssLibDir : '/<%= dirs.cssLib %>',
                        cssDir    : '/<%= dirs.css %>',
                        encoding  : '<%= encoding %>',
                        title     : 'march4',
                        jspHeader : '<!--%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%-->'
                    }
                },
                files: [{
                    expand: true,
                    cwd: '.',
                    src: ['**/*.tpl.html'],
                    dest: '.',
                    ext: '.html'
                }],
            }
        },

        copy: {
          dev: {
            files: [
                {
                    expand: true, 
                    cwd: '<%= dirs.src %>/', 
                    src: ['**/*.html','!**/*.tpl.html'], 
                    dest: '<%= dirs.jsp %>/', 
                    ext:'.jsp'
                },
                {
                    expand: true, 
                    cwd: '<%= dirs.src %>/<%= dirs.js %>/', 
                    src: ['**/*'], 
                    dest: '<%= dirs.dist %>/<%= dirs.js %>/'
                },
                {
                    expand: true,
                    cwd: '<%= dirs.src %>/<%= dirs.css %>/', 
                    src: ['**/*'], 
                    dest: '<%= dirs.dist %>/<%= dirs.css %>/'
                }
            ],
          },
        },

        'string-replace': {
            jspTemplate: {
                files: [{
                    expand: true,
                    cwd: '<%= copy.dev.files[0].dest %>',
                    src: ['**/*<%= copy.dev.files[0].ext %>'], 
                    dest: '<%= copy.dev.files[0].dest %>'
                }],
                options: {
                    replacements: [{
                        pattern: /<!--%/g,
                        replacement: '<%'
                    }, {
                        pattern: /%-->/g,
                        replacement: '%>'
                    }]
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-string-replace');
    
    grunt.registerTask('default', [
        'clean',
        'jshint',
        'bower_concat',
        'template:dev',
        'copy:dev',
        'string-replace:jspTemplate',
        'template:src'
    ]);
};
