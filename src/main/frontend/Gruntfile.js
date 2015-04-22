module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //vars
        dirs: { 
            src    : 'src',
            js     : 'js',
            jsLib  : 'js/lib',
            css    : 'css',
            cssLib : 'css/lib',
            less   : 'less',
            dist   : '../../../webapp'
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

            dev: {
                options: {
                    data: {
                        jsLibFile : '<%= fileNames.bower %>.js',
                        jsLibDir  : '<%= dirs.jsLib %>',
                        jsDir     : '<%= dirs.js %>',
                        cssLibDir : '<%= dirs.cssLib %>',
                        cssDir    : '<%= dirs.css %>',
                        encoding  : '<%= encoding %>',
                        title     : 'march4'
                    }
                },
                files: [{
                    expand: true,
                    cwd: '.',
                    src: ['**/*.html.tpl'],
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
                    src: ['**/*.html'], 
                    dest: '<%= dirs.dist %>/WEB-INF/jsp/', 
                    ext:'.jsp'
                },
                {
                    expand: true, 
                    cwd: '<%= dirs.js %>/', 
                    src: ['**/*'], 
                    dest: '<%= dirs.dist %>/<%= dirs.js %>/'
                },
                {
                    expand: true,
                    cwd: '<%= dirs.css %>/', 
                    src: ['**/*'], 
                    dest: '<%= dirs.dist %>/<%= dirs.css %>/'
                }
            ],
          },
        },
    });

    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-template');
    
    grunt.registerTask('default', ['clean','jshint','bower_concat','template:dev','copy:dev']);
};
