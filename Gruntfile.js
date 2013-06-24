'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    livereload: {
      port: 35729 // Default livereload listening port.
    },
    connect: {
      livereload: {
        options: {
          port: 9001,
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, options.base)]
          }
        }
      }
    },
    watch: {
      stylus: {
        files: ['app/src/stylus/**/*.styl'],
        tasks: ['stylus'],
        options: {
          livereload: true
        }
      },
      jade: {
        files: ['app/src/jade/**/*.jade'],
        tasks: ['jade']
      },
      html: {
        files: ['**/*.html'],
        options: {
          livereload: true
        }
      }
    },
    stylus: {
      files: {
        'app/styles/main.css': 'app/src/stylus/*.styl'
      }
    },
    jade: {
      html: {
        files: [{
          expand: true,
          cwd: 'app/src/jade',
          src: ['**/*.jade'],
          dest: 'app/views',
          ext: '.html'
        }],
        options: {
          client: false,
        }
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');

  grunt.registerTask('default', ['connect', 'watch', 'jade', 'stylus']);
};
