module.exports = {
	options: {
		files: ['{package,bower}.json'],
		updateConfigs: ['pkg'],
		commit: true,
		commitFiles: ['-a'],
		createTag: true,
		push: true,
		pushTo: 'origin'
	}
};