const readWords = require('./word-reader.js')

class Dictionary {
	static getWord() {
		return readWords({path:'./assets/es-ES.dic'})
			.then(totalWords => {
			  const index =  Math.floor(Math.random() * (totalWords.length + 1));
			  return totalWords[index];
			})
	}
}

module.exports = Dictionary