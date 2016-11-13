var express = require('express');
var router = express.Router();

router.post('/', (req, res, next) => {
  var user = req.body
  var db = req.app.get('db')
  if(user.username !== undefined && user.password !== undefined) {
    db('users').insert(user).returning('*').then( (users) => {
      return res.json(users[-1]);
    });
  } else {
    var err = new Error('Not found');
    err.status = 400;
    next(err);
  }
});

module.exports = router;
