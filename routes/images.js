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
  var username = req.body.username
  var collectionName = req.body.collection
  var url = req.body.url
  var newImage = {
    imageUrl: url
  }

  User.getUserId(newImage, username)
  .then(function(imgObj) { return Collection.getCollectionId(imgObj, collectionName) })
  .then(function(imgObj) { return Image.create(res, imgObj) })
});

module.exports = router;
