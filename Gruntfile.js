module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //vars
        dirs: { 
            src    : 'websrc',
            js     : 'js',
            jsLib  : 'js/lib',
            css    : 'css',
            img    : 'img',
            cssLib : 'css/lib',
            less   : 'css',
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
                '<%= dirs.jsp %>/**/*.tpl.jsp',
                '<%= dirs.src %>/<%= dirs.cssLib %>/**/*',
                '<%= dirs.dist %>/<%= dirs.css %>/**/*',
                '<%= dirs.dist %>/<%= dirs.js %>/**/*'
            ]
        },

        bower_concat: {
            all: {
                dest    : '<%= dirs.src %>/<%= dirs.jsLib %>/<%= config.bowerFile %>.js',
                cssDest : '<%= dirs.src %>/<%= dirs.cssLib %>/<%= config.bowerFile %>.css'
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
                        liveReload: '<script src="//localhost:<%= config.livePort %>/livereload.js"></script>'
                    }
                },
                files: [{
                    expand: true,
                    cwd  : '<%= dirs.src %>/',
                    src  : ['**/*.html'],
                    dest : '<%= dirs.jsp %>/',
                    ext  : '.jsp'
                },{
                    expand: true,
                    cwd  : '<%= dirs.src %>/',
                    src  : ['**/*.div'],
                    dest : '<%= dirs.jsp %>/',
                    ext  : '.div.jsp'
                }],
            }
        },

        copy: {
            js: {
                files: [{
                    expand : true, 
                    cwd    : '<%= dirs.src %>/<%= dirs.js %>/', 
                    src    : ['**/*'], 
                    dest   : '<%= dirs.dist %>/<%= dirs.js %>/'
                }]
            },
            css: {
                files: [{
                    expand : true,
                    cwd    : '<%= dirs.src %>/<%= dirs.css %>/', 
                    src    : ['**/*.css'], 
                    dest   : '<%= dirs.dist %>/<%= dirs.css %>/'
                }]
            },
            img: {
                files: [{
                    expand : true,
                    cwd    : '<%= dirs.src %>/<%= dirs.img %>/', 
                    src    : ['**/*'], 
                    dest   : '<%= dirs.dist %>/<%= dirs.img %>/'
                }]
            },
        },

        surround: {
            options: {
                prepend: '<!--%@ page language="java" contentType="text/html; charset=<%= config.encoding %>" pageEncoding="<%= config.encoding %>"%-->',
            },
            all: {
                files: [{
                    expand : true,
                    cwd    : '<%= template.all.files[0].dest %>/',
                    src    : ['**/*<%= template.all.files[0].ext%>'],
                    dest   : '<%= template.all.files[0].dest %>/',
                    ext    : '<%= template.all.files[0].ext%>'
                },{
                    expand : true,
                    cwd    : '<%= template.all.files[1].dest %>/',
                    src    : ['**/*<%= template.all.files[1].ext%>'],
                    dest   : '<%= template.all.files[1].dest %>/',
                    ext    : '<%= template.all.files[1].ext%>'
                }]
            }
        },

        'string-replace': {
            jspTemplate: {
                files: [{
                    expand : true,
                    cwd    : '<%= dirs.jsp %>',
                    src    : ['**/*.jsp'], 
                    dest   : '<%= dirs.jsp %>'
                }],
                options: {
                    replacements: [{
                        pattern     : /<!--%/g,
                        replacement : '<%'
                    }, {
                        pattern     : /%-->/g,
                        replacement : '%>'
                    }]
                }
            }
        },

        less: {
            all: {
                options: {
                    compress            : true,
                    sourceMap           : true,
                    sourceMapFileInline : true,
                    outputSourceFiles   : true,
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
                        new (require('less-plugin-clean-css'))()
                    ]
                },
                files: [{
                    expand : true,
                    cwd    : '<%= dirs.src %>/<%= dirs.less %>/',
                    src    : ['**/*.less'],
                    dest   : '<%= dirs.dist %>/<%= dirs.css %>/',
                    ext    : '.css'
                }],
            }
        },

        watch: {
            options: {
              spawn: false
            },
            js: {
                files   : ['<%= jshint.all %>'],
                tasks   : ['jshint','copy:js'],
                options : {
                    livereload: true
                }
            },

            html: {
                files   : ['<%= dirs.src %>/**/*.html','<%= dirs.src %>/**/*.div'],
                tasks   : ['htmlToJsp'],
                options : {
                    livereload: true
                }
            },

            css: {
                files   : ['<%= copy.css.files[0].cwd %>/<%= copy.css.files[0].src %>'],
                tasks   : ['copy:css'],
                options : {
                    livereload: true
                }
            },

            img: {
                files   : ['<%= copy.img.files[0].cwd %>/<%= copy.img.files[0].src %>'],
                tasks   : ['copy:img'],
                options : {
                    livereload: true
                }
            },

            less: {
                files   : ['<%= less.all.files[0].cwd %>/<%= less.all.files[0].src %>'],
                tasks   : ['less'],
                options : {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-surround');
    grunt.loadNpmTasks('grunt-string-replace');
    
    grunt.registerTask('htmlToJsp', [
        'template',
        'surround',
        'string-replace',
    ]);

    grunt.registerTask('default', [
        'clean',
        'jshint',
        'bower_concat',
        'htmlToJsp',
        'copy:js',
        'copy:css',
        'less'
    ]);
};
