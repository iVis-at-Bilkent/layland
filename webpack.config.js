const path = require('path');

module.exports = {
	mode: 'production',
	devtool: 'inline-source-map',
	entry: './src/js/main.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, ''),
	},
	optimization: {
		// We do not want to minimize our code.
		minimize: false
	}  
};
