var express = require('express');
var router = express.Router();

router.post('/', (req, res, next) => {
  var db = req.app.get('db')
  var user = req.body

  db('users').where({username: user.username})
  .then( (existingUser) => {
    if(existingUser[0] !== undefined) {
      return res.json({errorMessage: 'Username already exists'})
    } else {
      if(user.username !== undefined && user.password !== undefined) {
        db('users').insert(user)
        .then( () => {
          //return JWT
          return res.json()
        });
      } else {
        var err = new Error('Not found');
        err.status = 400;
        next(err);
      }
    }
  });
});

module.exports = router;
