const fs = require('fs')
let words = [];

function readWords ({path = ''} = {}) {
	return new Promise((resolve, reject) => {
		if (words.length === 0) {
			fs.readFile(path, 'utf-8', (err, data) => {
			  if (err) {
			  	return reject(err)
			  };
			  words = data.split('\n').map(word => word.replace('\r', ''))
			  resolve(words)
			});
			return;
		}

		return resolve(words)		
	})
}

module.exports = readWords