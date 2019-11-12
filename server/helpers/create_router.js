const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const readWrite = require('./read_write.js');

const createRouter = function(collection) {

  const router = express.Router();

  router.get('/', (req, res) => {
    collection.find().toArray()
    .then(docs => res.json(docs))
    .catch(err => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err });
    });
  }),

  router.get('/write', (req, res) => {
    collection.find().toArray()
    .then(docs => {
      docs.forEach(object => delete object._id);
      readWrite.writeAsync('game_cards.json', docs);
      res.json(docs);
    })
    .catch(err => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err });
    });
  }),

  router.get('/read', (req, res) => {
    let finished = false;
    try {
      collection.drop();
    } catch(err) {
      console.error(err);
      res.status(500);
      res.json({ status:500, error:err });
    }
    const body = readWrite.readSync('game_cards.json');
    collection.insertMany(body)
    .then(result => {
      res.json(result.ops);
      finished = true;
    })
    .catch(err => {
      console.error(err);
      res.status(500);
      res.json({ status:500, error:err });
    });

    if (finished) {
      collection.find().toArray()
      .then(docs => res.json(docs))
      .catch(err => {
        console.error(err);
        res.status(500);
        res.json({ status:500, error:err });
      });
    }
  }),

  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection.findOne({ _id: ObjectID(id) })
    .then(doc => res.json(doc))
    .catch(err => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error:err });
    });
  }),

  router.get('/image/:folder/:id', (req, res) => {
    const id = req.params.id;
    const folder = req.params.folder;
    const filePath = `${__dirname}/../card_images/${folder}/${id}.jpg`;
    res.sendFile(filePath);
    console.log(filePath);
  }),

  router.get('/download/:start/:end', (req, res) => {
    const start = req.params.start;
    const end = req.params.end;
    collection.find().toArray()
    .then(docs => {
      for (let index = start; index < end; index++) {
        readWrite.download(docs[index].card_images[0].image_url, "large/");
        readWrite.download(docs[index].card_images[0].image_url_small, "small/");
      }
      console.log("Done");
      res.json(docs);
    })
    .catch(err => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err });
    });
  }),

  router.post('/', (req, res) => {
    const body = req.body;
    collection.insertOne(body)
    .then(result => res.json(result.ops[0]))
    .catch(err => {
      console.error(err);
      res.status(500);
      res.json({ status:500, error:err });
    });
  }),

  router.post('/all', (req, res) => {
    collection.drop();
    const body = req.body;
    collection.insertMany(body)
    .then(result => res.json(result.ops))
    .catch(err => {
      console.error(err);
      res.status(500);
      res.json({ status:500, error:err });
    });
  }),

  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    collection.deleteOne({ _id: ObjectID(id) })
    .then(doc => res.json(doc))
    .catch(err => {
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
    .then(result => res.json(result.value))
    .catch(err => {
      console.error(err);
      res.status(500);
      res.json({ status:500, error:err });
    });
  })

  return router;
};

module.exports = createRouter;
