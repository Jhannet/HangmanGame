const crypto = require('crypto')
const Dictionary = require('./dictionary.js')
const JSONDB = require('./json-db.js')

class Game {
	constructor({word, hint, leftAttempts = 5} = {}) {
		this.word = word;
		this.hint = hint;
		this.leftAttempts = leftAttempts;
	}

	static create({difficulty, includePunctuation, maxAttempts }={}) {
		let sizeMin = 5;
		let sizeMax = 8;

		if(difficulty.includes('hard')){
			sizeMin = 8;
			sizeMax = 50;
		}else{
			if(difficulty.includes('super-easy')){
				sizeMin = 0;
				sizeMax = 5;
			}
		}
		return Dictionary.getWord({sizeMin, sizeMax, includePunctuation})
		.then(word => {
			const newGame = new Game({
				word: word,
				hint: Game.createHint(word),
				leftAttempts: maxAttempts 
			})
			newGame.id = crypto.randomBytes(12).toString('hex');
			return JSONDB.save(newGame);
		})
		.then(savedGame => {
			delete savedGame.word;
			return savedGame;
		})
	}

	static createHint(word) {
		// TODO replace duplicate characters too in hint
		const wordLength = word.length;
		const index = Math.floor(Math.random() * wordLength);
		const letter = word[index];
		return Array.from(word).map((ch) => ch === letter ? ch : '_').join(' ');
	}

	static attempt(gameId, attempt) {
		return JSONDB.getGameById(gameId)
		.then(game => {
			if (game.word.includes(attempt.letter)) {
				// TODO udpate hint and save that
				return game;
			}
			if(game.leftAttempts > 0){
					game.leftAttempts--;
					game.isInvalid = true;
			} else {
				game.isGameOver = true;
			}
			return JSONDB.save(game);
		})
		.then(savedGame => {
			delete savedGame.word;
			return savedGame;
		})
		.catch()
	}
}

module.exports = Game