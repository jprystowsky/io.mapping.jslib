module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: {
			dist: ['dist']
		},

		mkdir: {
			dist: {
				options: {
					mode: 0700,
					create: ['dist']
				}
			}
		},

		uglify: {
			src: {
				files: {
					'dist/io.mapping.jslib.min.js' : ['src/**/*.js']
				}
			}
		},

		watch: {
			karma: {
				files: [
					'src/**/*.js',
					'test/spec/**/*Spec.js'
				],
				tasks: [
					'karma:unit:run'
				]
			}
		},

		karma: {
			unit: {
				configFile: 'test/conf/karma.conf.js',
				singleRun: true
			}
		},

		bump: {
			options: {
				files: ['{package,bower}.json'],
				updateConfigs: ['pkg'],
				commit: true,
				commitFiles: ['-a'],
				createTag: true,
				push: true,
				pushTo: 'upstream'
			}
		}
	});

	require('load-grunt-tasks')(grunt);

	grunt.loadTasks('tasks');
};