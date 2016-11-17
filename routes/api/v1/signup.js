var express = require('express');
var router = express.Router();

router.post('/', (req, res, next) => {
  var db = req.app.get('db')
  var user = req.body

  if(user.username && user.password) {
    db('users').where({username: user.username})
    .then( (existingUser) => {
      if(existingUser[0]) {
        return res.json({errorMessage: 'Username already exists'})
      } else {
        //hash password with bcrypt before saving
        db('users').insert(user)
        .then( () => {
          //generate JWT
          //return JWT
          return res.json()
        });
      }
    });
    }else{
      var err = new Error('Not found');
      err.status = 400;
      next(err);
    }
    //db('users').where({username: user.username})
    //.then( (existingUser) => {
    //if(existingUser[0] !== undefined) {
    //return res.json({errorMessage: 'Username already exists'})
    //} else {
    //if(user.username !== undefined && user.password !== undefined) {
    ////hash password with bcrypt before saving
    //db('users').insert(user)
    //.then( () => {
    ////return JWT
    //return res.json()
    //});
    //} else {
    //var err = new Error('Not found');
    //err.status = 400;
    //next(err);
    //}
    //}
    //});
  });

  module.exports = router;
