const fs = require('fs')
const Dictionary = require('./dictionary.js')

let games;
class Game {
	constructor (id, word) {
		this.id = id;
		this.hint = word;//'_ _ _ _ A';
		this.leftAttempts = 5;
	}
	static create() {
		return new Promise((resolve, reject) => {
			// let game = new Game(1);

			Dictionary.getWord().then(word => {
				console.log('word: ', word);
				let game = new Game(1,word);
				if (game != null) {
					readGames({path:'./assets/saved-games.json'})
					.then(games => {
						const gameString = JSON.stringify(game);
						games[`${game.id}`] = JSON.parse(gameString);
						writeGames({path:'./assets/saved-games.json'}).then(newGames =>{
							console.log(newGames);
							return resolve(game);
						});
					});
				}
				console.log("creating...");
			    return reject(game);
			});

			// return reject(game);		
		});
	}

	toString(){
		return `"${this.id}": {\n"id": ${this.id},\n"hint": "${this.hint}",\n"leftAttempts": ${this.leftAttempts}\n},\n`;
	}
}

function readGames ({path = ''} = {}) {
	return new Promise((resolve, reject) => {
		if (games == null) {
			fs.readFile(path, 'utf-8', (err, data) => {
			  if (err) {
			  	return reject(err)
			  };
			  games = JSON.parse(data);
			  resolve(games)
			});
			return;
		}

		return resolve(games)		
	})
}

function writeGames ({path = ''} = {}) {
	return new Promise((resolve, reject) => {
		if (games != null) {
			fs.writeFile(path, JSON.stringify(games), function (err) {
				  if (err){
				  	return reject(err);
				  } 
				  resolve(games);
				});
			return;
		}

		return resolve(games)		
	})
}


module.exports = Game