const express = require('express');
const app = express();

const parser = require('body-parser');
app.use(parser.json({limit: '50mb'}));
app.use(parser.urlencoded({limit: '50mb', extended: true}));

const cors = require('cors');
app.use(cors());

const http = require('http');
const server = http.Server(app);

const socketIO = require('socket.io');
const io = socketIO(server);
app.set('port', 5000);
app.use('/public', express.static(__dirname + '/public'));

const path = require('path');

// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

// Starts the server.
server.listen(5000, function() {
  console.log(`Starting server on port ${this.address().port}`);
});

io.on('connection', socket => {
  
});

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

app.listen(3000, function() {
  console.log(`Listening on port ${this.address().port}`);
})
