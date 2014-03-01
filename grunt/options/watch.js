module.exports = {
	karma: {
		files: [
			'src/**/*.js',
			'test/spec/**/*Spec.js'
		],
		tasks: [
			'karma:unit:run'
		]
	}
};