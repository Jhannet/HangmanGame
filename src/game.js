const fs = require('fs')

class Game {
	constructor (id) {
		this.id = id;
		this.hint = '_ _ _ _ A';
		this.leftAttempts = 5;
	}
	static create() {
		return new Promise((resolve, reject) => {
			let game = new Game(1);
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