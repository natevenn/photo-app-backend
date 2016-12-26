var db = require('../db/knex');

function create(res, imgObj) {
  db('images').insert(imgObj).returning('*')
  .then( (images) => {
    return res.json({id: images[0].id, imageUrl: images[0].imageUrl})
  })
}

function deleteImage(res, id) {
  db('images')
  .where('id', id)
  .del()
  .then( (image) => {
    return res.json('Image id ' + image + ' was deleted')
  });
}

module.exports = {
  create: create,
  deleteImage: deleteImage
}
