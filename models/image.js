var db = require('../db/knex');

function create(res, imgObj) {
  db('images').insert(imgObj).returning('*')
  .then( (images) => {
    return res.json({imageUrl: images[0].imageUrl})
  })
}

module.exports = {
  create: create
}
