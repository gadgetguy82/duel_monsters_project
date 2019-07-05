const express = require('express');
const app = express();

const parser = require('body-parser');
app.use(parser.json());

const cors = require('cors');
app.use(cors());

const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

MongoClient.connect('mongodb://localhost:27017', (error, client) => {
  if (error) {
    console.log(error);
  }
  const db = client.db('duel_monsters_game');
  const cardsCollection = db.collection('cards');
  const playerDeckCollection = db.collection('player_deck');
  const cardsRouter = createRouter(cardsCollection);
  app.use('/api/duel_monsters_game', cardsRouter);
});

app.listen(3000, function() {
  console.log(`Listening on port ${this.address().port}`);
})
