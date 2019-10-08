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

  const normalMonsterCardsCollection = db.collection('normal_monsters');
  const normalMonsterCardsRouter = createRouter(normalMonsterCardsCollection);
  app.use('/api/duel_monsters_game/normal_monsters', normalMonsterCardsRouter);

  const effectMonstersCollection = db.collection('effect_monsters');
  const effectMonstersRouter = createRouter(effectMonstersCollection);
  app.use('/api/duel_monsters_game/effect_monsters', effectMonstersRouter);

  const fusionMonstersCollection = db.collection('fusion_monsters');
  const fusionMonstersRouter = createRouter(fusionMonstersCollection);
  app.use('/api/duel_monsters_game/fusion_monsters', fusionMonstersRouter);

  const geminiMonstersCollection = db.collection('gemini_monsters');
  const geminiMonstersRouter = createRouter(geminiMonstersCollection);
  app.use('/api/duel_monsters_game/gemini_monsters', geminiMonstersRouter);

  const linkMonstersCollection = db.collection('link_monsters');
  const linkMonstersRouter = createRouter(linkMonstersCollection);
  app.use('/api/duel_monsters_game/link_monsters', linkMonstersRouter);

  const pendulumMonstersCollection = db.collection('pendulum_monsters');
  const pendulumMonstersRouter = createRouter(pendulumMonstersCollection);
  app.use('/api/duel_monsters_game/pendulum_monsters', pendulumMonstersRouter);

  const ritualMonstersCollection = db.collection('ritual_monsters');
  const ritualMonstersRouter = createRouter(ritualMonstersCollection);
  app.use('/api/duel_monsters_game/ritual_monsters', ritualMonstersRouter);

  const spiritMonstersCollection = db.collection('spirit_monsters');
  const spiritMonstersRouter = createRouter(spiritMonstersCollection);
  app.use('/api/duel_monsters_game/spirit_monsters', spiritMonstersRouter);

  const synchroMonstersCollection = db.collection('synchro_monsters');
  const synchroMonstersRouter = createRouter(synchroMonstersCollection);
  app.use('/api/duel_monsters_game/synchro_monsters', synchroMonstersRouter);

  const toonMonstersCollection = db.collection('toon_monsters');
  const toonMonstersRouter = createRouter(toonMonstersCollection);
  app.use('/api/duel_monsters_game/toon_monsters', toonMonstersRouter);

  const tunerMonstersCollection = db.collection('tuner_monsters');
  const tunerMonstersRouter = createRouter(tunerMonstersCollection);
  app.use('/api/duel_monsters_game/tuner_monsters', tunerMonstersRouter);

  const unionMonstersCollection = db.collection('union_monsters');
  const unionMonstersRouter = createRouter(unionMonstersCollection);
  app.use('/api/duel_monsters_game/union_monsters', unionMonstersRouter);

  const xyzMonstersCollection = db.collection('xyz_monsters');
  const xyzMonstersRouter = createRouter(xyzMonstersCollection);
  app.use('/api/duel_monsters_game/xyz_monsters', xyzMonstersRouter);

  const tokenCardsCollection = db.collection('token_cards');
  const tokenCardsRouter = createRouter(tokenCardsCollection);
  app.use('/api/duel_monsters_game/token_cards', tokenCardsRouter);

  const skillCardsCollection = db.collection('skill_cards');
  const skillCardsRouter = createRouter(skillCardsCollection);
  app.use('/api/duel_monsters_game/skill_cards', skillCardsRouter);

  const spellCardsCollection = db.collection('spell_cards');
  const spellCardsRouter = createRouter(spellCardsCollection);
  app.use('/api/duel_monsters_game/spell_cards', spellCardsRouter);

  const trapCardsCollection = db.collection('trap_cards');
  const trapCardsRouter = createRouter(trapCardsCollection);
  app.use('/api/duel_monsters_game/trap_cards', trapCardsRouter);

  const gameCardsCollection = db.collection('game_cards');
  const gameCardsRouter = createRouter(gameCardsCollection);
  app.use('/api/duel_monsters_game/game_cards', gameCardsRouter);
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log(`Listening on port ${this.address().port}`);
});
