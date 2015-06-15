'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
	return connect.static(path.resolve(point));
};

module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: {
			build: {
				src: [".sass-cache"]
			}
		}, // end clean

		swig: {
			development: {
				init: {
					root: "app/swig/pages/",
					allowErrors: true,
					autoescape: true
				},
				cwd: "app/swig/pages/",
				src: ['**/*.swig'],
				dest: "template/",
				generateSitemap: false,
				generateRobotstxt: false
			}
		}, // end swig

		sass: {
			dist: {
				options: {
					style: 'expanded',
					sourcemap: false,
					noCache: true
				},
				files: {
					'template/css/style.css': 'app/sass/style.scss'
				}
			}
		}, // end sass

		cssmin: {
			minify: {
				expand: true,
				cwd: 'template/css/',
				src: ['*.css', '!*.min.css'],
				dest: 'template/css/',
				ext: '.min.css'
			}
		}, // end css minify

		uglify: {
			my_target: {
				files: [{
					expand: true,
					cwd: 'app/js/',
					src: '**/*.js',
					dest: 'template/js',
					ext: '.min.js'
				}]
			}
		}, // end js minify

		copy: {
			main: {
				expand: true,
				cwd: 'app/js',
				src: '**',
				dest: 'template/js'
			}
		},

		connect: {
			server: {
				options: {
					port: 8000,
					base: 'template/',
					hostname: '*'
				}
			}
		}, // end connect

		watch: { // this is a watcher, to run this in terminal write: grunt watch
			options: {
				dateFormat: function(time) {
					grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
					grunt.log.writeln('Waiting for new changes ...');
				},
				livereload: true
			},
			css: {
				files: 'app/sass/**/*.scss',
				tasks: ['sass', 'cssmin']
			},
			html: {
				files: 'app/swig/**/*.swig',
				tasks: ['swig']
			},
			js: {
				files: 'app/js/**/*',
				tasks: ['copy:main']
			},
			jsmin: {
				files: 'app/js/**/*.js',
				tasks: ['uglify']
			}
		} // end watch
	});

	grunt.loadNpmTasks('grunt-contrib-watch');		// Load the plugin that provides the "watch" task.
	grunt.loadNpmTasks('grunt-contrib-cssmin');		// Load the plugin that provides the "cssmin" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');		// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-sass');		// Load the plugin that provides the "sass" task.
	grunt.loadNpmTasks('grunt-contrib-livereload');	// Load the plugin that provides the "livereload" task.
	grunt.loadNpmTasks('grunt-contrib-connect');	// Load the plugin that provides the "connect" task.
	grunt.loadNpmTasks('grunt-contrib-clean');		// Load the plugin that provides the "clean" task.
	grunt.loadNpmTasks('grunt-swig');				// Load the plugin that provides the "swig" task.
	grunt.loadNpmTasks('grunt-contrib-copy');		// Load the plugin that provides the "copy" task.

	grunt.registerTask('default', ['watch']);		// this is the default command, use in terminal 'grunt'
	grunt.registerTask('dev', ['connect', 'swig', 'sass', 'uglify', 'cssmin', 'copy:main', 'clean', 'watch']);	// use 'grunt dev' for development
};
