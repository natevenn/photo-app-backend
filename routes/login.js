var express = require('express');
var router = express.Router();
var User = require('../models/user.js')


router.post('/', (req, res, next) => {
  var db = req.app.get('db')
  var username = req.body.username
  var password = req.body.password
  var result = User.exists(username, password)
});

module.exports = router;
