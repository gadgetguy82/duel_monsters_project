const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const readWrite = require('./read_write.js');

const createRouter = function(collection) {

  const router = express.Router();

  router.get('/', (req, res) => {
    collection.find().toArray()
    .then((docs) => res.json(docs))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err });
    });
  }),

  router.get('/write', (req, res) => {
    collection.find().toArray()
    .then(docs => {
      readWrite.writeAsync('game_cards.json', docs);
      res.json(docs);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err });
    });
  }),

  router.get('/read', (req, res) => {
    try {
      collection.drop();
    } catch (err) {
      console.error(err);
      res.status(500);
      res.json({ status:500, error:err });
    }
    const body = readWrite.readSync('game_cards.json');
    collection.insertMany(body)
    .then((result) => res.json(result.ops))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status:500, error:err });
    });
  }),

  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection.findOne({ _id: ObjectID(id) })
    .then((doc) => res.json(doc))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error:err });
    });
  }),

  router.post('/', (req, res) => {
    const body = req.body;
    collection.insertOne(body)
    .then((result) => res.json(result.ops[0]))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status:500, error:err });
    });
  }),

  router.post('/all', (req, res) => {
    collection.drop();
    const body = req.body;
    collection.insertMany(body)
    .then((result) => res.json(result.ops))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status:500, error:err });
    });
  }),

  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    collection.deleteOne({ _id: ObjectID(id) })
    .then((doc) => res.json(doc))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status:500, error:err });
    });
  }),

  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedBody = req.body;
    delete updatedBody._id;
    collection.findOneAndUpdate(
      { _id: ObjectID(id) },
      { $set: updatedBody },
      { returnOriginal: false }
    )
    .then((result) => res.json(result.value))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status:500, error:err });
    });
  })

  return router;
};

module.exports = createRouter;
