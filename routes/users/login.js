var express = require('express');
var router = express.Router();
var User = require('../../models/user.js')


router.post('/', (req, res, next) => {
  var db = req.app.get('db')
  var username = req.body.username
  var password = req.body.password

  if(username && password) {
    db('users').where({username: username})
    .then( (user) => {
      if(user[0]) {
        var user = user[0]
        User.authenticate(res, password, user)
      } else {
        res.json({errorMessage: 'Invalid username or password'})
      }
    });
  }else{
    var err = new Error('Not found');
    err.status = 400;
    next(err);
  }
});

module.exports = router;
