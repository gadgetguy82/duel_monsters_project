const express = require('express');
const app = express();

const parser = require('body-parser');
app.use(parser.json({limit: '50mb'}));
app.use(parser.urlencoded({limit: '50mb', extended: true}));

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
  const storeCardsCollection = db.collection('store_cards');
  const storeRouter = createRouter(storeCardsCollection);
  app.use('/api/duel_monsters_game', storeRouter);
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log(`Listening on port ${this.address().port}`);
});
