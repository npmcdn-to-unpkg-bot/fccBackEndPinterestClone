// Gruntfile.js
module.exports = function(grunt) {

  grunt.initConfig({
    concurrent: {
      target: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    // configure nodemon
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    watch: {
      js: {
        files: ['*.js', 'app/*.js', 'app/models/*.js', 'public/js/*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      jade: {
        files: ['views/*.jade'],
        options: {
          livereload: true
        }
      }
    },

    jshint: {
      // when this task is run, lint the Gruntfile and all js files in src
      files: '<%= watch.js.files %>',
      options: {
        reporter: require('jshint-stylish'),// use jshint-stylish to make our errors look and read good
        globals: {
          "$": false,
          "jQuery": false
        }
      }
    }
  });

  // load npm Tasks
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // register the nodemon task when we run grunt
  //grunt.registerTask('default', ['nodemon', 'watch']);
  grunt.registerTask('default', '', function() {
    var taskList = [
      'concurrent',
      'watch',
      'nodemon'
    ];
    grunt.task.run(taskList);
  });
};
