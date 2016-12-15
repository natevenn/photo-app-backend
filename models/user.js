var db = require('../db/knex');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var secret = process.env.SECRET;

function create(res, user) {
  var newUser = {
    username: user.username,
    password: hashPassword(user.password)
  }

  db('users').insert(newUser).returning('*')
  .then( (user) => {
    var uid = user[0].id
    var jwt = generateJWT(uid);
    res.json({token: jwt, username: user[0].username})
  });
}

function generateJWT(uid) {
  return jwt.sign({uid: uid}, secret)
}

function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function exists(username, password) {
  db('users').where('username', username)
  .then( (user) => {
    if(user.length > 0) {
      var username = user[0].username
      var hash = user[0].password
      var result = authenticate(password, hash)
      console.log('authenticated', result)
      if(authenticate(password, hash)){
      }
    }else{
      //res.json(errorMessage: "invalid username or password")
    }
  });
}

function authenticate(password, hash) {
 bcrypt.compare(password, hash, (err, res) => {
    console.log('res', res)
  })
}


module.exports = {
  create: create,
  authenticate: authenticate,
  exists: exists
}
