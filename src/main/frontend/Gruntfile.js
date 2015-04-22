module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //vars
        dirs: { 
            src    : 'src',
            js     : '<%= dirs.src %>/js',
            jsLib  : '<%= dirs.src %>/js/lib',
            css    : '<%= dirs.src %>/css',
            cssLib : '<%= dirs.src %>/css/lib',
            less   : '<%= dirs.src %>/less',
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
                '<%= dirs.jsLib %>/**/*',
                '<%= dirs.cssLib %>/**/*'
            ]
        },

        bower_concat: {
            all: {
                dest: '<%= dirs.jsLib %>/<%= fileNames.bower %>.js',
                cssDest: '<%= dirs.cssLib %>/<%= fileNames.bower %>.css'
            }
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
                    dest: '<%= dirs.dist %>/js/'
                },
                {
                    expand: true,
                    cwd: '<%= dirs.css %>/', 
                    src: ['**/*'], 
                    dest: '<%= dirs.dist %>/css/'
                }
            ],
          },
        },
    });

    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-template');
    
    grunt.registerTask('default', ['clean','bower_concat','template:dev','copy:dev']);
};
