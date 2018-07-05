const fs = require('fs')
const games = [];
class Game {
	constructor (id, word) {
		this.id = id;
		this.hint = word;//'_ _ _ _ A';
		this.leftAttempts = 5;
	}
	static create(word) {
		return new Promise((resolve, reject) => {
			let game = new Game(1, word);
			// games = readFile('./assets/saved-games.json',games);
			fs.readFile('./assets/saved-games.json','utf-8', function (err, data) {
			  if (err) console.log(err)//throw err;
			  // gamesBuffer.push(data);
			  console.log(data);
			});
			if (game != null) {
				fs.writeFile('./assets/saved-games.json', JSON.stringify(game), function (err) {
				  if (err){
				  	return reject(game);
				  } 
				  resolve(game);
				});
				return;
			}

			return reject(game);		
		})
	}

	readFile(url, gamesBuffer) {
		fs.readFile(url,'utf-8', function (err, data) {
		  if (err) throw err;
		  // gamesBuffer.push(data);
		  console.log(data);
		});
		return gamesBuffer;
	}
	toString(){
		return `"${this.id}": {\n"id": ${this.id},\n"hint": "${this.hint}",\n"leftAttempts": ${this.leftAttempts}\n},\n`;
	}
	getId(){
		return this.id;
	}
	getHint(){
		return this.hint;
	}
	getLeftAttempts(){
		return this.leftAttempts;
	}
}

module.exports = Game