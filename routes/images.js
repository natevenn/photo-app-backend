var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Collection = require('../models/collection.js');
var Image = require('../models/image.js');
var jwt = require('jsonwebtoken');
var secret = process.env.SECRET;

router.get('/:username/:collection/images', (req, res, next) => {
  var db = req.app.get('db');
  var username = req.params.username
  var collection = req.params.collection

  db.select('images.id', 'imageUrl')
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
  var token = req.body.token
  var username = req.body.username
  var collectionName = req.body.collection
  var url = req.body.url
  var newImage = {
    imageUrl: url
  }

  if(token) {

    jwt.verify(token, secret, function(err, decoded) {
      if(err) {
        return res.json({ success: false, message: "Failed to authenticate" });
      }else{
        User.getUserId(newImage, username)
        .then(function(imgObj) { return Collection.getCollectionId(imgObj, collectionName) })
        .then(function(imgObj) { return Image.create(res, imgObj) })
      }
    });
  }
});

router.delete('/images/:id', (req, res, next) => {
  var imageId = req.params.id
  var token = req.body.token

  if(token) {
    jwt.verify(token, secret, function(err, decoded) {
      if(err) {
        return res.json({ success: false, message: "Failed to authenticate" });
      }else{
        Image.deleteImage(res, imageId)
      }
    });
  }
});

module.exports = router;
