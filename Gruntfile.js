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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-mkdir');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('test', [
		'karma'
	]);

	grunt.registerTask('compile', [
		'clean:dist',
		'mkdir:dist',
		'uglify:src'
	]);
};