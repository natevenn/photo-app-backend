var express = require('express');
var router = express.Router();
var User = require('../../models/user.js')

router.post('/', (req, res, next) => {
  var db = req.app.get('db')
  var user = req.body

  if(user.username && user.password) {
    db('users').where({username: user.username})
    .then( (existingUser) => {
      if(existingUser[0]) {
        res.json({errorMessage: 'Username already exists'})
      } else {
        User.create(res, user)
      }
    });
  }else{
    var err = new Error('Not found');
    err.status = 400;
    next(err);
  }
});

  module.exports = router;
