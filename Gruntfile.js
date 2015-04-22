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
        config: {
            bowerFile   : '_bower',
            encoding    : 'UTF-8',
            livePort    : 35729,
            projectName : 'march4'

        },
        
        

        //tasks
        clean: {
            all: [
                '**/_bower*.*',
                '<%= dirs.jsp %>/**/*',
                '<%= dirs.src %>/<%= dirs.cssLib %>/**/*',
                '<%= dirs.dist %>/<%= dirs.css %>/**/*',
                '<%= dirs.dist %>/<%= dirs.js %>/**/*'
            ]
        },

        bower_concat: {
            all: {
                dest: '<%= dirs.src %>/<%= dirs.jsLib %>/<%= config.bowerFile %>.js',
                cssDest: '<%= dirs.src %>/<%= dirs.cssLib %>/<%= config.bowerFile %>.css'
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
            all: {
                options: {
                    data: {
                        jsLibDir  : '/<%= dirs.jsLib %>',
                        jsDir     : '/<%= dirs.js %>',
                        cssLibDir : '/<%= dirs.cssLib %>',
                        cssDir    : '/<%= dirs.css %>',
                        jsLibFile : '<%= config.bowerFile %>.js',
                        cssLibFile: '<%= config.bowerFile %>.css',
                        encoding  : '<%= config.encoding %>',
                        title     : '<%= config.projectName %>',
                        jspHeader : '<!--%@ page language="java" contentType="text/html; charset=<%= config.encoding %>" pageEncoding="<%= config.encoding %>"%-->',
                        liveReload: '<script src="//localhost:<%= config.livePort %>/livereload.js"></script>'
                    }
                },
                files: [{
                    expand: true,
                    cwd: '<%= dirs.src %>/',
                    src: ['**/*.html'],
                    dest: '<%= dirs.jsp %>/',
                    ext: '.jsp'
                }],
            }
        },

        copy: {
            js: {
                files: [{
                    expand: true, 
                    cwd: '<%= dirs.src %>/<%= dirs.js %>/', 
                    src: ['**/*'], 
                    dest: '<%= dirs.dist %>/<%= dirs.js %>/'
                }]
            },
            css: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.src %>/<%= dirs.css %>/', 
                    src: ['**/*'], 
                    dest: '<%= dirs.dist %>/<%= dirs.css %>/'
                }]
            },
        },

        'string-replace': {
            jspTemplate: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.jsp %>',
                    src: ['**/*.jsp'], 
                    dest: '<%= dirs.jsp %>'
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

        watch: {
            js: {
                files: ['<%= jshint.all %>'],
                tasks: ['jshint','copy:js'],
                options: {
                    livereload: true
                }
            },

            html: {
                files: ['<%= dirs.src %>/**/*.html'],
                tasks: ['template','string-replace:jspTemplate'],
                options: {
                    livereload: true
                }
            },
        }
    });

    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-string-replace');
    
    

    grunt.registerTask('default', [
        'clean',
        'jshint',
        'bower_concat',
        'template',
        'string-replace:jspTemplate',
        'copy:js',
        'copy:css',
        'watch',
    ]);
};
