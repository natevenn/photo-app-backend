exports.up = function(knex, Promise) {
  return knex.schema.createTable('images', (t) => {
    t.increments('id').primary();
    t.string('imageUrl').notNullable();
    t.string('title');
    t.integer('user_id')
    .notNullable()
    .references('id')
    .inTable('users');
    t.integer('collection_id')
    .notNullable()
    .references('id')
    .inTable('collections');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('images');
};
