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
app.use(express.static('../client/public'));

server.listen(5000, function() {
  console.log(`Starting server on port ${this.address().port}`);
});

let roomCount = 1;

io.on('connection', socket => {
  socket.on('SEND_MESSAGE', msg => {
    console.log(msg);
  });

  const roomList = io.sockets.adapter.rooms;
  let currentRoom = "room" + roomCount;

  let count
  if (roomList[currentRoom] === undefined) {
    count = 0;
  } else {
    count = roomList[currentRoom].length;
  }

  if (count < 2) {
    socket.join(currentRoom);
    io.to(currentRoom).emit("roomNumber", currentRoom);
  } else {
    roomCount++;
    currentRoom = "room" + roomCount;
    socket.join(currentRoom);
    io.to(currentRoom).emit("roomNumber", currentRoom);
  }

  socket.on('action', emitObject => {
    io.to(emitObject.room).emit('action', emitObject.action);
  });
});

const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (error, client) => {
  if (error) {
    console.log(error);
  }
  const db = client.db('duel_monsters_game');

  const cardsCollection = db.collection('cards');
  const cardsRouter = createRouter(cardsCollection);
  app.use('/api/duel_monsters_game/cards', cardsRouter);

  const normalMonsterCardsCollection = db.collection('normal_monster_cards');
  const normalMonsterCardsRouter = createRouter(normalMonsterCardsCollection);
  app.use('/api/duel_monsters_game/normal_monster_cards', normalMonsterCardsRouter);

  const spellCardsCollection = db.collection('spell_cards');
  const spellCardsRouter = createRouter(spellCardsCollection);
  app.use('/api/duel_monsters_game/spell_cards', spellCardsRouter);

  const trapCardsCollection = db.collection('trap_cards');
  const trapCardsRouter = createRouter(trapCardsCollection);
  app.use('/api/duel_monsters_game/trap_cards', trapCardsRouter);

  const storeCardsCollection = db.collection('store_cards');
  const storeRouter = createRouter(storeCardsCollection);
  app.use('/api/duel_monsters_game/store_cards', storeRouter);
});

app.listen(3000, function() {
  console.log(`Listening on port ${this.address().port}`);
})
