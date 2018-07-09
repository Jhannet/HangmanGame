const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Game = require('./src/game.js');

app.get('/game', (req, res) => {
    const difficulty = req.query.difficulty || 'easy';
    const includePunctuation = req.query.includePunctuation || true;
    const maxAttempts = req.query.maxAttempts || 6;
    Game.create({ difficulty: difficulty,
                  includePunctuation: includePunctuation,
                  maxAttempts: maxAttempts
                })
        .then(game => {
            res.send(game)            
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                error: 'Game could not be created'
            })
        })
})

app.post('/game/:gameId/attempt', (req, res) => {
    const gameId = req.params.gameId
    const attempt = req.body
    Game.attempt(gameId, attempt)
      .then(result => {
        if (result.isGameOver) {
          res.status(500).send({
            error: 'You lose XD'
          });
        }
        if (result.isInvalid) {
          res.status(400).send(result);
        }
      })
      .catch(err => {
        console.log(err);
      })
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})
