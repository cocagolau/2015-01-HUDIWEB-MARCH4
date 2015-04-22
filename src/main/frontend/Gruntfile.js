module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            all: [
                '**/_bower*.*',
                'js/lib/**/*',
                'css/**/*'
            ]
        },
        
        bower_concat: {
            all: {
                dest: 'js/lib/_bower.js',
                cssDest: 'css/lib/_bower.css'
            }
        },
    });

    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    
    grunt.registerTask('initBuild', ['clean','bower_concat']);
};
