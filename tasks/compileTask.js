module.exports = function (grunt) {
	grunt.registerTask('compile', [
		'clean:dist',
		'mkdir:dist',
		'uglify:src'
	]);
};