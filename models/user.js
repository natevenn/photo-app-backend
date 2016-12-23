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

function authenticate(res, password, user) {
  var hash = user.password
  bcrypt.compare(password, hash, (error, response) => {
    if(response === true){
      var jwt = generateJWT(user.id)
      res.json({token: jwt, username: user.username, uid: user.id})
    }else{
      res.json({errorMessage: 'Invalid username or password'})
    }
  })
}


function getUserId(db, imgObj, username) {
  return db('users').where({username: username})
  .select('id')
  .then( (id) => {
    var user_id = id[0].id
    imgObj.user_id = user_id
    return imgObj
  });
}

module.exports = {
  create: create,
  authenticate: authenticate,
  getUserId: getUserId
}
