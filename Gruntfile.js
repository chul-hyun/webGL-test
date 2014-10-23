module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      scripts: {
        files: ['js/**'],
        tasks: ['init', 'watch']
      },
    },
    jshint: {
      files: ['Gruntfile.js', 'js/**'],
      options: {
        jshintrc: true,
        reporter: require('jshint-stylish')
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  // Default task(s).
  grunt.registerTask('init', ['jshint']);
  grunt.registerTask('default', ['init', 'watch']);

};