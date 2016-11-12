var users = require('../sample_data/users');
var images = require('../sample_data/images');
var collections = require('../sample_data/collections');
exports.seed = (knex, Promise) => {
  return knex.transaction(function (t) {
    return knex('images')
    .del()
    .then(function() {
      return knex('collections').
        del()
    }).then(function() {
      return knex('users').
        del()
    }).then(function() {
      return knex('users')
      .transacting(t)
      .insert(users)
    }).then(function (response) {
      return knex('collections')
      .transacting(t)
      .insert(collections)
    }).then(function (response) {
      return knex('images')
      .transacting(t)
      .insert(images)
    })
    .then(t.commit)
    .catch(t.rollback)
  })
};

