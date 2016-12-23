var express = require('express');
var router = express.Router();

router.get('/images', (req, res, next) => {
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

module.exports = router;
