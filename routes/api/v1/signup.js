var express = require('express');
var router = express.Router();

router.post('/', (req, res, next) => {
  //console.log('in post user!!!!!!!!!!!!!!!!');
  var db = req.app.get('db')
console.log('routes db', db('users'));
  var user = req.body
  //console.log('user', user);
  if(user.username !== undefined && user.password !== undefined) {
    db('users').insert(user).returning('*').then( (users) => {
      res.json({message: "user created!"})
      //return res.json(users[0]);
    });
  } else {
    var err = new Error('Not found');
    err.status = 400;
    next(err);
  }
});

module.exports = router;
