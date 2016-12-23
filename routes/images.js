var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Collection = require('../models/collection.js');
var Image = require('../models/image.js');

router.get('/:username/:collection/images', (req, res, next) => {
  var db = req.app.get('db');
  var username = req.params.username
  var collection = req.params.collection

  db.select('imageUrl')
  .from('images')
  .join('collections', {'collections.id': 'images.collection_id'})
  .join('users', {'users.id': 'images.user_id'})
  .where('collections.name', collection)
  .andWhere('users.username', username)
  .then( (imageUrls) => {
    return res.json(imageUrls);
  });
});

router.post('/images', (req, res, next) => {
  var db = req.app.get('db');
  var username = req.body.username
  var collectionName = req.body.collection
  var url = req.body.url
  var newImage = {
    imageUrl: url
  }

  User.getUserId(db, newImage, username)
  .then(function(imgObj) { return Collection.getCollectionId(imgObj, collectionName) })
  .then(function(imgObj) { return Image.create(res, imgObj) })
});

//function getUserId(db, newImage, username) {
  //return db('users').where({username: username})
  //.select('id')
  //.then( (id) => {
    //var user_id = id[0].id
    //newImage.user_id = user_id
  //});
//}

//function getCollectionId(db, newImage, collectionName) {
   //return db('collections').where({name: collectionName})
  //.select('id')
  //.then( (id) => {
    //var collection_id = id[0].id
    //newImage.collection_id = collection_id
  //});
//}

//function createImage(res, db, newImage) {
  //db('images').insert(newImage).returning('*')
  //.then( (images) => {
    //console.log('images', images[0])
    //res.json({imageUrl: images[0].imageUrl})
  //})
//}

module.exports = router;
