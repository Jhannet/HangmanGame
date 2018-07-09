const readWords = require('./word-reader.js')

class Dictionary {
	
	static getWord({sizeMin, sizeMax, includePunctuation}) {
		return readWords({path:'./assets/es-ES.dic'})
			.then(totalWords => {
			  const filteredWords = totalWords.filter(word => {
			  	if(includePunctuation){
			  		return word.length > sizeMin && word.length < sizeMax;
			  	}
			  	return word.length > sizeMin && word.length < sizeMax && !includePunctuation(word);
			  });
			  // console.log(filteredWords)
			  const index =  Math.floor(Math.random() * (filteredWords.length + 1));
			  return filteredWords[index];
			})
	}

	static includePunctuation(word) {
		return Array.from(word).some((ch) => ch == 'á'||ch == 'é'||ch == 'í'||ch == 'ó'||ch == 'ú' ? true : false);
	}
}

module.exports = Dictionary