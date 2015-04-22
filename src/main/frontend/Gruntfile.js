module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        dirs: {
            js : 'js',
            jsLib : 'js/lib',
            css : 'css',
            cssLib : 'css/lib',
            less : 'less'
        },
        fileNames: {
            bower : '_bower'
        },

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
            initBuild: {
                options: {
                    data: {
                        jsLibFile : '<%= fileNames.bower %>.js',
                        jsLibDir : '<%= dirs.jsLib %>',
                        jsDir : '<%= dirs.js %>',
                        cssLibDir : '<%= dirs.cssLib %>',
                        cssDir : '<%= dirs.css %>',
                        title : 'march4'
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
        }
    });

    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-template');
    
    grunt.registerTask('initBuild', ['clean','bower_concat','template:initBuild']);
};
